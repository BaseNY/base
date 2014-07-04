/* Message
{
	_id:
	createdAt:
	posterId:
	posterName:
	offerId: optional
	text:
	type: - 1 is an offer, 0 is a regular message -
	isPublic:
}
*/
Schemas.Message = new SimpleSchema({
	_id: {
		type: String,
		optional: true
	},
	posterId: {
		type: String
	},
	posterName: {
		type: String
	},
	conversationId: {
		type: String
	},
	text: {
		type: String
	},
	createdAt: {
		type: Date
	},
	read: {
		type: Boolean
	}
});

Messages = new Meteor.Collection('messages');

// TODO update this to allow user to edit their own messages?
Messages.allow({
	insert: function(userId, doc) {
		return userId && (userId === doc.posterId || Roles.userIsInRole(userId, 'admin'));
	},
	update: function(userId, doc, fieldNames, modifier) {
		return userId && Roles.userIsInRole(userId, 'admin');
	},
	remove: function(userId, doc) {
		return userId && Roles.userIsInRole(userId, 'admin');
	}
});

// doc should be given text
Messages.before.insert(function(userId, doc) {
	if (Meteor.isClient && !Meteor.isLoggedIn()) {
		throw new Meteor.Error(403, "Access denied: not logged in");
	}

	doc.createdAt = new Date();
	doc.read = false;

	check(doc, Schemas.Message);
});

Meteor.methods({
	_createMessage: function(text, conversationId) {
		var doc = {
			text: text,
			conversationId: conversationId,
			posterId: this.userId
		};
		var poster = Meteor.users.findOne(this.userId);
		if (poster) {
			doc.posterName = poster.profile.name;
		}
		return Messages.insert(doc);
	},
	_sendMessage: function(text, recipientId) {
		var doc = {
			text: text,
			posterId: this.userId
		};
		var poster = Meteor.users.findOne(this.userId);
		if (poster) {
			doc.posterName = poster.profile.name;
		}
		var userIds = [recipientId, this.userId];
		if (Conversations.existsWithUsers(userIds)) {
			doc.conversationId = Conversations.findOne({'users._id': {$all: userIds}})._id;
			return Messages.insert(doc);
		} else {
			Conversations.create(recipientId, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					doc.conversationId = res;
					return Messages.insert(doc);
				}
			})
		}
	},
	_readMessages: function(conversationId) {
		return Messages.update({conversationId: conversationId}, {$set: {read: true}}, {multi: true});
	}
});

Messages.create = function(text, conversationId, callback) {
	return Meteor.call('_createMessage', text, conversationId, callback);
};

Messages.send = function(text, recipientId, callback) {
	return Meteor.call('_sendMessage', text, recipientId, callback);
};

// Finds messages and sets them as read
Messages.read = function(conversationId, callback) {
	return Meteor.call('_readMessages', conversationId, callback);
};
