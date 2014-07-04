Package.describe({
	summary: "Posts"
});

Package.on_use(function(api) {
	api.use([
		'jquery',

		'meteor',
		'templating',
		'blaze-layout',

		'iron-router',
		'fast-render',
		'spacebars',

		'app-setup',
		'app-utils',
	]);

	api.add_files('collections/items.js', ['client', 'server']);
	api.add_files([
		'views/post_page.html',
		'views/post_page.js',
		'views/bidding.js'
	], 'client');
	api.add_files('publications.js', 'server');
	api.add_files('routing.js', ['client', 'server']);

	api.export('Items');
});
