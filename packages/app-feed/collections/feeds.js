Schemas.Feed = new SimpleSchema({
	_id: {
		type: String
	},
	name: {
		type: String
	},
	icon: {
		type: String,
		optional: true
	}
});

Feeds = new Meteor.Collection('feeds');

Feeds.before.insert(function(userId, doc) {
	check(doc, Schemas.Feed);
});