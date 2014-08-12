Debug.order('app-collections/collections/feeds.js');

Schemas.Feed = new SimpleSchema({
	createdAt: Schemas.defaults.createdAt,
	name: {
		type: String
	},
	icon: {
		type: String
	},
	user: { // the id of the user who created the feed
		type: String,
		optional: true
	}
});

Feeds = new Meteor.Collection('feeds');

Feeds.attachSchema(Schemas.Feed);

Feeds.allowAll(Collections.allow.admin);

if (Meteor.isServer) {
	/**
	 * Creates a feed with no user.
	 * @param  {Object} feed The feed object in the form shown by the schema
	 * @return {String}      The id of the inserted or found feed
	 */
	Feeds.createServerFeed = function(doc) {
		doc.user = {
			$exists: false
		};
		var feed = Feeds.findOne(feed);
		if (feed) {
			return feed._id;
		} else {
			delete doc.user;
			return Feeds.insert(doc);
		}
	};
}
