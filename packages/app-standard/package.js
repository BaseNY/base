Package.describe({
	summary: "Collection of standard packages that will probably be used in every app package",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.imply([
		'stevezhu:lodash@0.2.0',
		'app-debug'
	]);
});
