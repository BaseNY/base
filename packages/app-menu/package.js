Package.describe({
	summary: "Slide in menu and sidebar"
});

Package.on_use(function(api) {
	api.use([
		'templating',

		'mmenu-scss'
	]);

	api.add_files([
		'views/menu.html',
		'views/menu.js'
	], 'client');
});