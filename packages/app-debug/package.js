Npm.depends({
	'colors': '0.6.2'
});

Package.describe({
	summary: "Debug"
});

Package.on_use(function(api) {
	api.use('lodash');

	api.add_files('debug.js', ['client', 'server']);

	api.export('debug');
});
