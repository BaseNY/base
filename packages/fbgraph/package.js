Npm.depends({'fbgraph': '0.2.10'});

Package.describe({
	summary: "Wrapper for npm fbgraph package"
});

Package.on_use(function(api) {
	api.use('npm');

	api.add_files('fbgraph.js', 'server');

	api.export('FBGraph');
});

Package.on_test(function(api) {
	api.use([
		'fbgraph',
		'service-configuration',

		'tinytest',
		'test-helpers',
	]);

	api.add_files([
		'tests/fbgraph_test.js'
	], ['client', 'server']);
});
