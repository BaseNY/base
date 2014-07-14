Package.describe({
	summary: "Home"
});

Package.on_use(function(api) {
	api.use([
		'app-debug',

		'app-users',
		'app-feeds',
		'app-menu',

		'iron-router'
	]);

	api.use([
		'jquery',

		'templating',
		'blaze-layout'
	]);
	api.add_files([
		'views/home.html',
		'views/home.js'
	], 'client');
});
