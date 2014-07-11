Package.describe({
	summary: "Utils"
});

Package.on_use(function(api, where) {
	api.use([
		'jquery',
		'lodash',

		'templating',

		'app-debug'
	]);

	api.add_files('utils.js', ['client', 'server']);
	api.add_files([
		'ui_helpers.js',
		'jquery_fns.js'
	], 'client');

	api.export('Utils');
});
