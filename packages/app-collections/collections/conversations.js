Debug.order('app-collections/collections/conversations.js');

Schemas.ConversationUser = new SimpleSchema({
	_id: Schemas.defaults._id,
	/**
	 * The name of the conversation for the user designated by the id.
	 */
	conversationName: {
		type: String
	},
	/**
	 * Whether the conversation has been read.
	 * @type {Object}
	 */
	read: {
		type: Boolean,
		defaultValue: false
	},
	readSafetyMessage: {
		type: Boolean,
		defaultValue: false
	}
});

Schemas.Conversation = new SimpleSchema({
	createdAt: Schemas.defaults.createdAt,
	lastMessageAt: {
		type: Date,
		optional: true,
		defaultValue: null
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
		type: [Schemas.ConversationUser],
		minCount: 2
	}
});

Conversations = new Meteor.Collection('conversations');

Conversations.attachSchema(Schemas.Conversation);

Conversations.helpers({
	isGroup: function() {
		return this.users.length > 2;
	}
});

// for insert
// _.some(doc.users, function(user) {
// 	return user._id === userId;
// });
Conversations.allowAll(Collections.allow.admin);

/**
 * Checks whether a conversation already exists with the given users
 * @param  {[String]}	userIds	An array of userIds
 * @return {Boolean}			Whether a conversation already exists with the given users
 */
Conversations.existsWithUsers = function(userIds) {
	return Conversations.find({
		'users._id': {
			$all: userIds
		}
	}, {
		limit: 1
	}).count() >= 1;
};

Conversations.countUnread = function(userId) {
	return Conversations.find({
		users: {
			$elemMatch: {
				_id: userId,
				read: false
			}
		}
	}).count();
};

Conversations.markRead = Utils.forwardMeteorMethod('_markConversationRead');
Conversations.markUnread = Utils.forwardMeteorMethod('_markConversationRead');

Conversations.create = Utils.forwardMeteorMethod('_createConversation');

/*Conversations.updateName = function(name, callback) {
	return Conversations.update()
};*/

// ======================= SERVER =======================

var generateConversationName = function(otherUsers) {
	if (otherUsers.length === 1) {
		return otherUsers[0].profile.name;
	} else {
		return _.reduce(otherUsers, function(memo, user, index, list) {
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
};

/**
 * Processes userIds to return an array to match the format of the ConversationUser schema.
 * @param  {String}		currentUserId	The id of the user who created the conversation
 * @param  {[String]}	userIds			The ids of the users in the conversation
 * @return {[Object]}					A user array to match the format of the ConversationUser schema
 */
var processUsers = function(currentUserId, userIds) {
	var users = Users.find({
		_id: {
			$in: userIds
		}
	}, {
		fields: {
			'profile.name': true,
			'profile.firstName': true
		}
	}).fetch();

	return _.map(users, function(user) {
		var otherUsers = _.filter(users, function(otherUser) {
			return user._id !== otherUser._id;
		});
		return {
			_id: user._id,
			conversationName: generateConversationName(otherUsers),
			read: user._id === currentUserId // is read for the user who created the conversation
		}
	});
};

Meteor.methodsRequireLogin({
	_createConversation: function(userIds, offerId) {
		// add current user if not in the userIds array
		if (!_.contains(userIds, this.userId)) {
			userIds.push(this.userId);
		}
		if (userIds.length < 2) {
			throw new Meteor.Error(630, "A conversation must have at least two users");
		}
		var conv = {
			users: processUsers(this.userId, userIds)
		};
		if (offerId) {
			conv.offerId = offerId;
		}
		return Conversations.insert(conv);
	},
	/**
	 * Marks the conversation as read for the user who calls this method
	 * @param  {String} conversationId The _id of the conversation
	 * @return {Number}                The number of documents modified
	 */
	_markConversationRead: function(conversationId) {
		return Conversations.update({
			_id: conversationId,
			'users._id': this.userId
		}, {
			$set: {
				'users.$.read': true
			}
		});
	},
	// TODO test markUnread
	_markConversationUnread: function(conversationId, senderId) {
		return Conversations.update({
			_id: conversationId,
			'users': {
				$elemMatch: {
					_id: {
						$ne: senderId
					}
				}
			}
		}, {
			$set: {
				'users.$.read': false
			}
		}, {
			multi: true
		});
	}
});

// // if the users are already processed (doc.processUsers is not present)
// // then that means that the current user (Meteor.user()) is already in doc.users
// // and that the users are already in the form specified by Schemas.ConversationUser

// // if doc.processUsers is true
// // that means that the doc.users array is a list of user ids
// // which may or may not include the id of the current user
// Conversations.before.insert(function(userId, doc) {

// 	/*
// 	if (doc.users.length === 2) {
// 		var userIds = doc.users;
// 		if (!doc.processUsers) {
// 			userIds = _.pluck(userIds, '_id');
// 		}
// 		if (Conversations.existsWithUsers(userIds)) {
// 			throw new Meteor.Error(610, "You are already in a conversation with this person");
// 		}
// 	} else if (doc.users.length === 1 && doc.users[0] === userId) {
// 		throw new Meteor.Error(612, "You cannot send a message to yourself");
// 	}*/

// 	Debug.messaging('Conversations.before.insert', doc);
// });

// Conversations.after.insert(function(userId, doc) {
// 	// add conversation to users
// 	var userIds = _.pluck(doc.users, '_id');
// 	Meteor.call('updateUsersConversations', userIds, doc._id, function(err, res) {
// 		console.log(err ? err : 'updated users conversations');
// 	});
// });

// // TODO test this
// Conversations.before.remove(function(userId, doc) {
// 	Meteor.users.update(userId, {$pull: {conversationIds: doc._id}});
// });

// Meteor.methods({
//     clearSafety: function(conversationId) {
//         Conversations.update({_id: conversationId},{$pull: {safetyMessage: Meteor.userId()}});
//     },
// 	updateUsersConversations: function(userIds, conversationId) {
// 		Meteor.users.update({_id: {$in: userIds}}, {$push: {conversationIds: conversationId}}, {multi: true});
// 	},
// 	_updateConversationTime: function(_id) {
// 		return Conversations.update(_id, {$set: {lastMessageAt: new Date()}});
// 	},
// });
