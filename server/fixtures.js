defaultFeeds = [{
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

if (!Feeds.findOne()) {
	_.each(defaultFeeds, function(feed) {
		Feeds.insert(feed);
	});
	console.log(defaultFeeds);
}
