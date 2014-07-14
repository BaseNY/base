Package.describe({
	summary: "Feed"
});

Package.on_use(function(api) {
	api.use([
		'app-debug',
		'app-utils',

		'iron-router'
	]);

	api.use([
		'simple-schema',
		'collection2',

		'app-schemas'
	]);
	api.use('app-posts', {unordered: true});
	api.add_files('collections/feeds.js', ['client', 'server']);
	api.add_files('collections/fixtures.js', 'server');

	api.use([
		'jquery',
		'velocityjs',

		'templating',
		'blaze-layout'
	]);
	api.add_files([
		'views/feed_post_form.html',
		'views/feed_post_form.js',
		'views/feed_post.html',
		'views/feed_post.js',
		'views/feed.html',
		'views/feed.js'
	], 'client');

	api.use([
		'iron-router',
		'fast-render'
	]);
	api.add_files('router.js', ['client', 'server']);

	api.export('Feeds');
});
