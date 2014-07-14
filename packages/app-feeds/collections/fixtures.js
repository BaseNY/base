Debug.order('app-feeds/collections/fixtures.js');

var defaultFeeds = [{
	name: 'Sneakers',
	icon: 'money'
}, {
	name: 'Electronics',
	icon: 'laptop'
}, {
	name: 'Clothing (Men)',
	icon: 'male'
}, {
	name: 'Clothing (Women)',
	icon: 'female'
}, {
	name: 'Books',
	icon: 'book'
}, {
	name: 'Others',
	icon: 'random'
}];

Feeds.defaultIds = [];

if (!Feeds.findOne()) {
	Feeds.defaultIds = _.map(defaultFeeds, function(feed) {
		return Feeds.insert(feed);
	});
} else {
	Feeds.defaultIds = _.map(defaultFeeds, function(feed) {
		return Feeds.findOne({name: feed.name})._id;
	});
}

Debug.feed('Default Feed Ids', Feeds.defaultIds);
