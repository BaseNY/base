Package.describe({
	summary: "Debug"
});

Package.on_use(function(api) {
	api.use('lodash');

	api.add_files('debug.js', ['client', 'server']);

	api.export('Debug');
});
