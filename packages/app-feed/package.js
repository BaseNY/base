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
		'check',

		'app-setup',
		'app-schemas',
		'app-utils',
		'app-debug'
	]);

	api.add_files('collections/feeds.js', ['client', 'server']);
	api.add_files('fixtures.js', 'server');
	api.add_files([
		'views/feed.html',
		'js/feed.js',
		'views/feed_post.html',
		'js/feed_post.js',
		'js/infinite.js'
	], 'client');
	api.add_files('routing.js', ['client', 'server']);

	api.export('Feeds');
});
