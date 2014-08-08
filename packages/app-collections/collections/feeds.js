Debug.order('app-collections/collections/feeds.js');

Schemas.Feed = new SimpleSchema({
	createdAt: Schemas.defaults.createdAt,
	name: {
		type: String
	},
	icon: {
		type: String,
		optional: true
	}
});

Feeds = new Meteor.Collection('feeds');

Feeds.attachSchema(Schemas.Feed);

Feeds.allow({
	insert: function(userId, doc) {
		return userId && Roles.userIsInRole(userId, 'admin');
	},
	update: function(userId, doc, fields, modifier) {
		return userId && Roles.userIsInRole(userId, 'admin');
	},
	remove: function(userId, doc) {
		return userId && Roles.userIsInRole(userId, 'admin');
	}
});
