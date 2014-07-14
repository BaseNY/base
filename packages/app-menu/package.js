Package.describe({
	summary: "Slide in menu and sidebar"
});

Package.on_use(function(api) {
	api.use([
		'app-debug',
		'app-utils',

		'iron-router'
	]);
	api.use([
		'templating',
		'blaze-layout',
		'spacebars',

		'mmenu-scss',

		'app-users',
		'app-feeds'
	]);

	api.add_files([
		'views/menu.html',
		'views/menu.js'
	], 'client');
});
