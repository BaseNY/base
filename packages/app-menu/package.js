Package.describe({
	summary: "Slide in menu and sidebar"
});

Package.on_use(function(api) {
	api.use([
		'templating',
		'spacebars',
		'blaze-layout',

		'mmenu-scss',

		'app-utils'
	]);

	api.add_files([
		'views/menu.html',
		'views/menu.js'
	], 'client');
});
