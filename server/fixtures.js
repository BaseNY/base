Meteor.startup(function() {
	defaultFeedIds = [];
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
		defaultFeedIds = _.map(defaultFeeds, function(feed) {
			return Feeds.insert(feed);
		});
	} else {
		defaultFeedIds = _.map(Feeds.find().fetch(), function(feed) {
			return feed._id;
		});
	}
	console.log(defaultFeedIds);
});
