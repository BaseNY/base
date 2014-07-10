Package.describe({
	summary: "Home"
});

Package.on_use(function(api) {
	api.use([
		'jquery',

		'iron-router',
		'fast-render',

		'templating'
	]);

	api.add_files([
		'views/home_sidebar.html',
		'views/home_sidebar.js',
		'views/home_post.html',
		'views/home_post.js',
		'views/home_feed.html',
		'views/home_feed.js',
		'views/home.html',
		'views/home.js'
	], 'client');
	api.add_files('router.js', ['client', 'server']);
});
