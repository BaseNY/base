Package.describe({
	summary: "Product page"
});

Package.on_use(function(api) {
	api.use([
		'templating',

		'app-main',
		'app-utils',
	]);
	api.add_files([
		'views/item_page.html',
		'views/item_page.js'
	], 'client');
});
