Package.describe({
	summary: "For connecting the collection2 package with the app"
});

Package.on_use(function(api) {
	api.add_files('schemas.js', ['client', 'server']);

	api.export('Schemas');
});
