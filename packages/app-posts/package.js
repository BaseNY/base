Package.describe({
	summary: "Posts"
});

Package.on_use(function(api) {
	api.use([
		'app-debug',
		'app-utils'
	]);

	api.use([
		'simple-schema',
		'collection2',

		'app-schemas'
	]);
	api.use('app-feeds', {unordered: true});
	api.add_files('collections/items.js', ['client', 'server']);

	api.use([
		'jquery',
		'templating',
		'blaze-layout',
		'spacebars'
	]);
	api.add_files([
		'views/post_page.html'
	], 'client');

	api.use([
		'iron-router',
		'fast-render'
	]);
	api.add_files('routing.js', ['client', 'server']);

	api.export('Items');
});
