Package.describe({
	summary: "Posts"
});

Package.on_use(function(api) {
	api.use([
		'app-debug',
		'app-utils',

		'app-aws'
	]);

	api.use([
		'simple-schema',
		'collection2',

		'app-collections'
	]);

	api.use([
		'jquery',
		'templating',
		'blaze-layout',
		'spacebars'
	]);
	api.add_files([
		'views/post_page.html'
	], 'client');

	api.use([
		'iron-router',
		'fast-render'
	]);
	api.add_files('routing.js', ['client', 'server']);
});
