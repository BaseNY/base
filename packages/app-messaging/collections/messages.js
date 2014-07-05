/* Message
{
	_id:
	createdAt:
	senderId:
	senderName:
	offerId: optional
	text:
	type: - 1 is an offer, 0 is a regular message -
	isPublic:
}
*/
Schemas.Message = new SimpleSchema({
	_id: {
		label: '_id',
		type: String,
		optional: true
	},
	senderId: {
		label: 'Sender Id',
		type: String
	},
	senderName: {
		label: 'Sender Name',
		type: String
	},
	conversationId: {
		label: 'Conversation Id',
		type: String
	},
    type: {
    	label: 'Type',
        type: Number,
        optional: true
    /*
     * text = 0
     * img = 1
     * offer = 2
    */
    },
	text: {
		label: 'Text',
		type: String,
        optional: true
	},
	createdAt: {
		label: 'Created At',
		type: Date
	},
	read: {
		label: 'Read',
		type: Boolean
	}
});

Messages = new Meteor.Collection('messages');

// TODO update this to allow user to edit their own messages?
Messages.allow({
	insert: function(userId, doc) {
		return userId && (userId === doc.senderId || Roles.userIsInRole(userId, 'admin'));
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

	Conversations.update(doc.conversationId, {
		$set: {lastMessageAt: doc.createdAt}
	});

	check(doc, Schemas.Message);
});

Meteor.methods({
	_createMessage: function(text, conversationId, type) {
		var doc = {
			text: text,
            type: type,
			conversationId: conversationId,
			senderId: this.userId
		};
		var sender = Meteor.users.findOne(this.userId);
		if (sender) {
			doc.senderName = sender.profile.name;
		}
		Debug.messaging('_createMessage', doc);
		return Messages.insert(doc);
	},
	_sendMessage: function(text, recipientId) {
		var doc = {
			text: text,
			senderId: this.userId
		};
		var sender = Meteor.users.findOne(this.userId);
		if (sender) {
			doc.senderName = sender.profile.name;
		}
		var userIds = [recipientId, this.userId];
		Debug.messaging('_sendMessage', doc);
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
			});
		}
	},
	_readMessages: function(conversationId) {
		return Messages.update({conversationId: conversationId}, {$set: {read: true}}, {multi: true});
	}
});

Messages.create = function(text, conversationId, type, callback) {
	return Meteor.call('_createMessage', text, conversationId, type, callback);
};

Messages.send = function(text, recipientId, callback) {
	return Meteor.call('_sendMessage', text, recipientId, callback);
};

// Finds messages and sets them as read
Messages.read = function(conversationId, callback) {
	return Meteor.call('_readMessages', conversationId, callback);
};
