Npm.depends({
	colors: '1.0.2'
});

Package.describe({
	summary: "Debug",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use('stevezhu:lodash@0.2.0');
	api.add_files('debug.js', ['client', 'server']);
	api.export('Debug');

	api.use('templating');
	api.addFiles([
		'views/debug_order.html',
		'views/debug_order.js'
	], 'client');
});
