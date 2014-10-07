var both = ['client', 'server'];

Package.describe({
	summary: "Collections"
});

Package.onUse(function(api) {
	api.addAndExport = function(filename, exportedObject, architecture) {
		api.addFiles(filename, architecture);
		api.export(exportedObject, architecture);
	};

	// ========= SETUP =========

	api.versionsFrom('METEOR@0.9.3.1');

	api.use(['app-standard', 'app-utils']);

	api.addAndExport('schemas.js', 'Schemas', both);

	// ========= CONFIG =========

	api.use('service-configuration');
	api.addFiles('service_config.js', 'server');

	// ========= COLLECTIONS =========

	api.use([
		'mongo',
		'alanning:roles@1.2.13',
		'aldeed:simple-schema@1.0.3',
		'aldeed:collection2@2.1.0'
	]);

	api.addFiles('collections.js', both);

	api.use([
		'accounts-base',
		'accounts-facebook',

		'stevezhu:fbgraph@1.1.0'
	]);
	api.addAndExport('collections/users.js', 'Users', both);

	api.addAndExport('collections/feeds.js', 'Feeds', both);

	// ========= PUBLICATIONS AND FIXTURES =========


	// ========= MIGRATIONS =========

	api.use('percolatestudio:percolatestudio-migrations@0.7.1');
	api.addFiles('migrations.js', 'server');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('app-collections');
	api.addFiles([
		'tests/feeds_test.js'
	], both);
});
