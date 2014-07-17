Package.describe({
	summary: "Feed"
});

Package.on_use(function(api) {
	api.use([
		'app-debug',
		'app-utils',

		'app-aws',

		'iron-router'
	]);

	api.use([
		'simple-schema',
		'collection2',

		'app-collections'
	]);

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
});
