Debug.order('app-collections/collections/conversations.js');

Schemas.ConversationUser = new SimpleSchema({
	_id: {
		type: String
	},
	// the name of the conversation for the user designated by the id
	conversationName: {
		type: String
	},
	read: {
		type: Boolean
	}
});

Schemas.Conversation = new SimpleSchema({
	_id: {
		type: String,
		optional: true
	},
	name: {
		type: String,
		optional: true
	},
    safetyMessage: {
        type: [String],
        optional: true
    },
	offerId: {
		type: String,
		optional: true
	},
	users: {
		type: [Schemas.ConversationUser],
		minCount: 2
	},
	createdAt: {
		type: Date
	},
	lastMessageAt: {
		type: Date
	}
});

Conversations = new Meteor.Collection('conversations');

Conversations.helpers({
	isGroup: function() {
		return this.users.length > 2;
	}
});

//Conversations.attachSchema(Schemas.Conversation);

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

// if the users are already processed (doc.processUsers is not present)
// then that means that the current user (Meteor.user()) is already in doc.users
// and that the users are already in the form specified by Schemas.ConversationUser

// if doc.processUsers is true
// that means that the doc.users array is a list of user ids
// which may or may not include the id of the current user
Conversations.before.insert(function(userId, doc) {
	if (Meteor.isClient && !Meteor.isLoggedIn()) {
		throw new Meteor.Error(403, "Access denied: not logged in");
	}

	// add current user if not in the doc.users array
	if (doc.processUsers && !_.contains(doc.users, userId)) {
		doc.users.push(userId);
	}

	/*
	if (doc.users.length === 2) {
		var userIds = doc.users;
		if (!doc.processUsers) {
			userIds = _.pluck(userIds, '_id');
		}
		if (Conversations.existsWithUsers(userIds)) {
			throw new Meteor.Error(610, "You are already in a conversation with this person");
		}
	} else if (numUsers < 2) {
		throw new Meteor.Error(611, "A conversation must have at least two people");
	} else if (doc.users.length === 1 && doc.users[0] === userId) {
		throw new Meteor.Error(612, "You cannot send a message to yourself");
	}*/

	if (!_.has(doc, 'createdAt')) {
		doc.createdAt = new Date();
	}
	if (!_.has(doc, 'lastMessageAt')) {
		doc.lastMessageAt = new Date();
	}

	// doc.users should be an array of userIds if doc.processUsers is true
	// after processing the results are added to convUsers
	// which is an array of users according to Schema.ConversationUser
	if (doc.processUsers) {
		(function processUsers() {
			// processed user array to match the format of the ConversationUser schema
			var convUsers = [];

			var recipientIds = doc.users;
			var users = Meteor.users.find({
				_id: {$in: recipientIds}
			}, {
				'profile.name': true,
				'profile.firstName': true
			}).fetch();
			_.each(users, function(user) {
				var otherUsers = _.filter(users, function(recipient) {
					return user._id !== recipient._id;
				});
				var name;
				if (users.length == 2) {
					name = otherUsers[0].profile.name;
				} else {
					name = _.reduce(otherUsers, function(memo, user, index, list) {
						var firstName = user.profile.firstName;
						if (index === 0) {
							return memo + firstName;
						} else if (index === list.length - 1) {
							return memo + ' and ' + firstName;
						} else {
							return memo + ', ' + firstName;
						}
					}, '');
				}
				convUsers.push({
					_id: user._id,
					conversationName: name,
					// is read for the user who created the conversation
					read: user._id === userId
				});
			});
			doc.users = convUsers;
		})();
		delete doc.processUsers;
	}

	Debug.messaging('Conversation', doc);

	check(doc, Schemas.Conversation);
});

Conversations.after.insert(function(userId, doc) {
	// add conversation to users
	var userIds = _.pluck(doc.users, '_id');
	Meteor.call('updateUsersConversations', userIds, doc._id, function(err, res) {
		console.log(err ? err : 'updated users conversations');
	});
});

// TODO test this
Conversations.before.remove(function(userId, doc) {
	Meteor.users.update(userId, {$pull: {conversationIds: doc._id}});
});

Meteor.methods({
    clearSafety: function(conversationId) {
        Conversations.update({_id: conversationId},{$pull: {safetyMessage: Meteor.userId()}});
    },
	updateUsersConversations: function(userIds, conversationId) {
		Meteor.users.update({_id: {$in: userIds}}, {$push: {conversationIds: conversationId}}, {multi: true});
	},
	// must give an array of userIds
	_createConversation: function(userIds, offerId) {
		var conv = {
			processUsers: true,
			users: userIds,
            safetyMessage: userIds
		};
		if (offerId) {
			conv.offerId = offerId;
		}
		return Conversations.insert(conv);
	},
	_updateConversationTime: function(_id) {
		return Conversations.update(_id, {$set: {lastMessageAt: new Date()}});
	},
	_markRead: function(conversationId, userId) {
		Debug.messaging('marking read', {conversationId: conversationId, userId: userId});
		return Conversations.update({
			_id: conversationId,
			'users._id': userId
		}, {
			$set: {'users.$.read': true}
		}, {
			multi: true
		});
	},
	_markUnread: function(conversationId, senderId) {
		Debug.messaging('marking unread', {conversationId: conversationId, senderId: senderId});
		return Conversations.update({
			_id: conversationId,
			'users': {$elemMatch: {_id: {$ne: senderId}}}
		}, {
			$set: {'users.$.read': false}
		}, {
			multi: true
		});
	}
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

	var args = _.toArray(arguments);

	// set callback
	var callback = _.last(args);
	if (!_.isFunction(callback)) {
		callback = undefined;
	}

	// if is name
	if (_.isString(args[1])) {
		conv.name = args[1];
	}

	return Meteor.call('_createConversation', userIds, null, callback);
};

// function to check whether a conversation already exists with the given users
Conversations.existsWithUsers = function(userIds) {
	return Conversations.find({'users._id': {$all: userIds}}, {limit: 1}).count() >= 1;
};

Conversations.markRead = function(conversationId, userId, callback) {
	return Meteor.call('_markRead', conversationId, userId, callback);
};

Conversations.markUnread = function(conversationId, senderId, callback) {
	return Meteor.call('_markUnread', conversationId, senderId, callback);
};

Conversations.countUnreadFor = function(userId) {
	return Conversations.find({
		users: {
			$elemMatch: {
				_id: userId,
				read: false
			}
		}
	}).count();
};
