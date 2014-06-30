Schemas.ConversationUser = new SimpleSchema({
	_id: {
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
		if (userId) {
			if (Roles.userIsInRole(userId, 'admin')) {
				return true;
			} else {
				return _.some(doc.users, function(user) {
					return user._id === userId;
				});
			}
		}
		return false;
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

	if ((doc.processUsers && doc.users.length === 0) || (!doc.processUsers && doc.users.length === 1)) {
		throw new Meteor.Error(400, "A conversation must have at least two people");
	} else if (doc.users.length === 1 && doc.users[0] === userId) {
		throw new Meteor.Error(400, "You cannot send a message to yourself");
	}

	if (!_.has(doc, 'createdAt')) {
		doc.createdAt = new Date();
	}
	// processed user array to match the format of the ConversationUser schema
	var convUsers = [];
	// doc.users should be an array of userIds if doc.processUsers is true
	if (doc.processUsers) {
		if (doc.users.length === 1) { // if there is only 1 recipient
			var recipientId = doc.users[0],
				recipient = Meteor.users.findOne({_id: recipientId}, {'profile.name': true});
			convUsers.push({_id: recipientId, conversationName: Meteor.user().profile.name});
			convUsers.push({_id: userId, conversationName: recipient.profile.name});
		} else if (doc.user.length > 1) { // if a group of people
			// all the users in the chat
			var recipients = Meteor.users.find({_id: {$in: recipientIds}}, {'profile.firstName': true}).fetch();
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
				convUsers.push({_id: user._id, conversationName: name});
			});
		} else {
			throw new Meteor.Error(400, "Users array is invalid");
		}
		doc.users = convUsers;
		delete doc.processUsers;
	}

	if (Meteor.settings.public.debug) {
		console.logObj('Conversation', doc);
	}
	//check(doc, Schemas.Conversation);
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

	Conversations.insert(conv, callback);
};
