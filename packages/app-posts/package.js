Package.describe({
	summary: "Posts"
});

Package.on_use(function(api) {
	api.use([
		'templating',

		'iron-router',

		'app-setup',
		'app-utils',
	]);

	api.add_files([
		'views/item_page.html',
		'views/item_page.js'
	], 'client');
});
