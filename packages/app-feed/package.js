Package.describe({
	summary: "Feed"
});

Package.on_use(function(api) {
	api.use([
		'lodash',
		'jquery',

		'meteor',
		'session',
		'iron-router',

		'templating',
		'blaze-layout',

		'collection-hooks',
		'simple-schema',
		'collection2',

		'app-setup',
		'app-schemas',
		'app-utils',
		'app-debug'
	]);

	api.add_files('collections/feeds.js', ['client', 'server']);
	api.add_files('collections/fixtures.js', 'server');
	api.add_files([
		'views/feed.html',
		'views/feed.js',
		'views/feed_post.html',
		'views/feed_post.js',
		'views/infinite.js'
	], 'client');
	api.add_files('routing.js', ['client', 'server']);

	api.export('Feeds');
});
