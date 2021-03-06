Package.describe({
	summary: "Home",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use([
		'app-debug',

		'app-users',
		'app-feeds',
		'app-menu',

		'iron:router@0.9.1',
	]);

	api.use([
		'jquery',

		'templating'
	]);
	api.addFiles([
		'views/home.html',
		'views/home.js'
	], 'client');
});
