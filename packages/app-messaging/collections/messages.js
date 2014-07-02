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
	}
});

Messages = new Meteor.Collection('messages');

Messages.attachSchema(Schemas.Message);

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

	_.defaults(doc, {
		createdAt: new Date(),
		posterId: userId,
		posterName: Meteor.user().profile.name
	});
});
