Package.describe({
	summary: "Slide in menu and sidebar",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.use([
		'app-debug',
		'app-utils',

		'iron:router@0.9.4',
	]);
	api.use([
		'templating',
		'spacebars',

		'mmenu-scss',

		'app-collections',
		'app-users',
		'app-feeds'
	]);

	api.addFiles([
		'views/menu.html',
		'views/menu.js'
	], 'client');
});
