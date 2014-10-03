Package.describe({
	summary: "Utils",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use([
		'jquery',
		'stevezhu:lodash@0.2.0',
		'mrt:moment@2.8.1',

		'templating',

		'app-debug',

		'app-aws'
	]);

	api.addFiles('util.js', ['client', 'server']);
	api.addFiles([
		'ui_helpers.js',
		'jquery_fns.js'
	], 'client');
	api.export('Utils');
});
