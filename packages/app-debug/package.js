var both = ['client', 'server'];

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
	api.addFiles('debug.js', both);
	api.export('Debug');

	/*api.use('templating');
	api.add_files([
		'views/debug_order.html',
		'views/debug_order.js'
	], 'client');*/
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('app-debug');
	api.addFiles('tests/debug_tests.js', both);
});
