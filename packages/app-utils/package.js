var both = ['client', 'server'];

Package.describe({
	summary: "Utility functions"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use('app-standard');
	api.use(['accounts-base']);

	api.addFiles('utils.js', both);
	api.export('Utils', both);

	api.use(['templating', 'ejson']);
	api.addFiles('template_helpers.js', 'client');

	api.use('jquery');
	api.addFiles('jquery_fns.js', 'client');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('app-utils');
	api.addFiles('tests/utils_test.js', both);
});
