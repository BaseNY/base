Debug.order('app-feeds/collections/feeds.js');

Schemas.Feed = new SimpleSchema({
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

/*
Feeds.allow({
	insert: function(userId, doc) {

	},
	update: function(userId, doc, fields, modifier) {

	},
	remove: function(userId, doc) {
	}
});*/

Meteor.methods({
	'_createFeed': function(name, icon) {
		var feed = {
			name: name
		};
		if (icon) {
			feed.icon = icon;
		}
		return Feeds.insert(feed);
	}
});
