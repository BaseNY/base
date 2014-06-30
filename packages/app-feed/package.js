Package.describe({
	summary: "Feed"
});

Package.on_use(function(api) {
	api.use([
		'underscore',
		'session',
		'templating',
		'blaze-layout',
		'jquery',
		'simple-schema',

		'app-schemas'
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

	api.export('Feeds');
});
