if (Meteor.isServer) {
	Meteor.methods({
		// set conversation read for all users
		testSetConversationRead: function(conversationId, read) {
			return Conversations.update({
				_id: conversationId,
				'users.read': !read
			}, {
				$set: {
					'users.$.read': read
				}
			}, {
				$multi: true
			});
		}
	});

	Meteor.publish('allUserData', function() {
		return Users.find({}, {
			fields: {
				_id: true,
				profile: true
			}
		});
	});
}

if (Meteor.isClient) {
	Deps.autorun(function() {
		Meteor.subscribe('allUserData');
		Meteor.subscribe('conversations');
	});

	Meteor._suppress_log(1);
	Tinytest.addAsync("Conversations - Create - With less than 2 users", function(test, next) {
		Conversations.create([], function(err) {
			test.isTrue(err instanceof Error, "Expected error to occur because users shouldn't be allowed to create a conversation with less than 2 users: " + err);
			next();
		});
	});

	var convId;
	Tinytest.addAsync("Conversations - Create - Create Conversation", function(test, next) {
		Conversations.create(_.pluck(Users.find().fetch(), '_id'), function(err, _id) {
			convId = _id;
			test.isUndefined(err, "Expected no error to occur: " + err);
			next();
		});
	});


	// TODO test these with more users
	Tinytest.addAsync("Conversations - Mark as read", function(test, next) {
		Meteor.call('testSetConversationRead', convId, false, function(err) {
			var conv = Conversations.findOne(convId);
			var readUsers = _.filter(conv.users, function(user) {
				return user.read;
			});
			test.equal(readUsers.length, 0, "Expected all users to be unread");
			Conversations.markRead(convId, function(err, numModified) {
				test.isUndefined(err, "Expected no error to occur: " + err);
				var conv = Conversations.findOne(convId);
				var readUsers = _.filter(conv.users, function(user) {
					return user.read;
				});
				test.isTrue(readUsers.length === 1 && readUsers[0]._id === Meteor.userId(), "Expected only the current user to be marked read");
				Meteor.call('testSetConversationRead', convId, true, function(err) {
					next();
				});
			});
		});
	});

	Tinytest.addAsync("Conversations - Mark as unread", function(test, next) {
		Meteor.call('testSetConversationRead', convId, true, function(err) {
			var conv = Conversations.findOne(convId);
			console.log(conv.users);
			var unreadUsers = _.filter(conv.users, function(user) {
				return !user.read;
			});
			test.equal(unreadUsers.length, 0, "Expected all users to be read");
			/*Conversations.markUnread(convId, Meteor.userId(), function(err, numModified) {
				test.isUndefined(err, "Expected no error to occur: " + err);
				var conv = Conversations.findOne(convId);
				console.log(convId);
				console.log(numModified);
				console.log(conv);
				var readUsers = _.filter(conv.users, function(user) {
					return user.read;
				});
				test.isTrue(readUsers.length === 1 && readUsers[0]._id === Meteor.userId(), "Expected only the current user to be marked read");
				next();
			});*/
			next();
		});
	});
}
