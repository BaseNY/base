Debug.order('app-collections/fixtures.js');

var defaultFeeds = [{
	name: 'Sneakers',
	icon: 'money',
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

/**
 * It's ok that Feeds.defaultIds isn't defined on the client because the client should never create users
 */
Feeds.defaultIds = _.map(defaultFeeds, function(defaultFeed) {
	return Feeds.createServerFeed(defaultFeed);
});

//Debug.collections('Feeds.defaultIds', Feeds.defaultIds);
