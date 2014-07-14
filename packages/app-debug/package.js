Npm.depends({colors: '0.6.2'});

Package.describe({
	summary: "Debug"
});

Package.on_use(function(api) {
	api.use('lodash');

	api.add_files('debug.js', ['client', 'server']);

	api.use('templating');
	api.add_files([
		'views/debug_order.html',
		'views/debug_order.js'
	], 'client');

	api.export('Debug');
});
