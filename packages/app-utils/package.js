Package.describe({
	summary: "Utils"
});

Package.on_use(function(api, where) {
	api.use([
		'jquery',
		'lodash',
		'moment',

		'templating',

		'app-debug',

		'app-aws'
	]);

	api.add_files('utils.js', ['client', 'server']);
	api.add_files([
		'ui_helpers.js',
		'jquery_fns.js'
	], 'client');

	api.export('Utils');
});
