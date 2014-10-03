Package.describe({
	summary: "Home"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');
	api.use([
		'app-debug',

		'app-users',
		'app-feeds',
		'app-menu',

		'iron:router@0.9.4',
	]);

	api.use([
		'jquery',

		'templating',
		'blaze-layout'
	]);
	api.addFiles([
		'views/home.html',
		'views/home.js'
	], 'client');
});
