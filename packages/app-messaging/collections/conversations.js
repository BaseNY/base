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
		type: [String]
	},
	createdAt: {
		type: Date
	}
});

Conversations = new Meteor.Collection('conversations');

Conversations.attachSchema(Schemas.Conversation);

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
	if (!Meteor.isLoggedIn()) {
		throw new Meteor.Error(403, "Access denied: not logged in");
	}

	if (!_.has(doc, 'users')) {
		doc.users = [];
	}

	// the document shouldn't be named if there are two people
	// if there are only 2 people in the conversation and the given doc has a name and the name is not an empty string
	if (doc.users.length === 2 && _.has(doc, 'name') && doc !== "") {
		throw new Meteor.Error(400, "Access denied: A conversation between only two people should not be named");
	}
	/*
	if (doc.users.length < 2) {
		throw new Meteor.Error(400, "Access denied: A conversation must have more than one person");
	}*/

	// add the current user
	if (!_.contains(doc.users, userId)) {
		doc.users.push(userId);
	}
	if (!_.has(doc, 'createdAt')) {
		doc.createdAt = new Date();
	}
});
