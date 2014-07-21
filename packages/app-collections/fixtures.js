Debug.order('app-collections/fixtures.js');

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

Feeds.defaultIds = _.map(defaultFeeds, function(defaultFeed) {
	var feed = Feeds.findOne(defaultFeed);
	if (feed) {
		return feed._id;
	} else {
		return Feeds.insert(defaultFeed);
	}
});

//Debug.collections('Feeds.defaultIds', Feeds.defaultIds);
