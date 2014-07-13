Package.describe({
	summary: "Offers"
});

Package.on_use(function(api) {
	api.use([
		'simple-schema',

		'collection-hooks',

		'app-utils',
		'app-schemas',
		'app-email'
	]);

	api.add_files('collections/offers.js', ['client', 'server']);
	api.add_files('publications.js', 'server');

	api.export('Offers');
});
