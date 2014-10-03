Package.describe({
	summary: "Slide in menu and sidebar"
});

Package.onUse(function(api) {
	api.use([
		'app-debug',
		'app-utils',

		'iron:router@0.9.4',
	]);
	api.use([
		'templating',
		'blaze-layout',
		'spacebars',

		'mmenu-scss',

		'app-users',
		'app-feeds'
	]);

	api.addFiles([
		'views/menu.html',
		'views/menu.js'
	], 'client');
});
