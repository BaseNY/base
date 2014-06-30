Schemas.ConversationUser = new SimpleSchema({
	id: {
		type: String
	},
	// the name of the conversation for the user designated by the id
	conversationName: {
		type: String
	}
});

Schemas.Conversation = new SimpleSchema({
	_id: {
		type: String
	},
	name: {
		type: String,
		optional: true
	},
	offerId: {
		type: String,
		optional: true
	},
	users: {
		type: [Schemas.ConversationUser]
	},
	createdAt: {
		type: Date
	}
});

Conversations = new Meteor.Collection('conversations');

Conversations.allow({
	insert: function(userId, doc) {
		return userId && (_.contains(doc.users, userId) || Roles.userIsInRole(userId, 'admin'));
	},
	update: function(userId, doc, fieldNames, modifier) {
		return userId && Roles.userIsInRole(userId, 'admin');
	},
	remove: function(userId, doc) {
		return userId && Roles.userIsInRole(userId, 'admin');
	}
});

Conversations.before.insert(function(userId, doc) {
	if (Meteor.isClient && !Meteor.isLoggedIn()) {
		throw new Meteor.Error(403, "Access denied: not logged in");
	}
	// the document shouldn't be named if there are two people
	// if there are only 2 people in the conversation and the given doc has a name and the name is not an empty string
	if (doc.users.length < 2) {
		throw new Meteor.Error(400, "A conversation must have more than one person");
	}

	/*
	// add the current user
	if (!_.contains(doc.users, userId)) {
		doc.users.push(userId);
	}*/
	// processed user array to match the format of the ConversationUser schema
	var convUsers = [];
	// doc.users should be an array of userIds if doc.processUsers is true
	if (doc.processUsers) {
		if (doc.users.length === 1) { // if there is only 1 recipient
			var recipientId = doc.users[0];
			if (recipientId === userId) {
				throw new Meteor.Error(400, "You cannot send a message to yourself");
			}
			var recipient = Meteor.users.findOne({
				_id: recipientId
			}, {
				'profile.name': true
			});
			convUsers.push({
				id: recipientId,
				conversationName: Meteor.user().profile.name
			});
			convUsers.push({
				id: userId,
				conversationName: recipient.profile.name
			});
		} else if (doc.user.length > 1) { // if a group of people
			// all the users in the chat
			var recipients = Meteor.users.find({
				_id: {
					$in: recipientIds
				}
			}, {
				'profile.firstName': true
			}).fetch();
			// add the current user to the list
			recipients.push(Meteor.user());
			_.each(recipients, function(user) {
				var otherUsers = _.filter(recipients, function(recipient) {
					return recipient._id !== user._id;
				});
				var name = _.reduce(otherUsers, function(memo, user, index, list) {
					var firstName = user.profile.firstName;
					if (index === 0) {
						return memo + firstName;
					} else if (index === list.length - 1) {
						return memo + ' and ' + firstName;
					} else {
						return memo + ', ' + firstName;
					}
				}, '');
				convUsers.push({
					id: user._id,
					conversationName: name
				});
			});
		} else {
			throw new Meteor.Error(400, "Users array is invalid");
		}
	}
	if (!_.has(doc, 'createdAt')) {
		doc.createdAt = new Date();
	}

	check(doc, Schemas.Conversation);
});

// userIds is either the recipient or the group of users
// name is optional
// (userIds, [name], [callback])
Conversations.create = function(userIds) {
	// if the first argument is just one id
	// then put the id in an array
	if (!_.isArray(userIds)) {
		userIds = [userIds];
	}

	var conv = {
		processUsers: true,
		users: userIds
	};
	var callback;
	// the second arg could be the name or the callback
	// if is name
	if (_.isString(arguments[1])) {
		conv.name = arguments[1];
		if (_.isFunction(arguments[2])) {
			callback = arguments[2];
		}
	}
	// if is callback
	else if (_.isFunction(arguments[1])) {
		callback = arguments[1];
	}

	if (callback) {
		Conversations.insert(conv, callback);
	} else {
		Conversations.insert(conv);
	}
};
