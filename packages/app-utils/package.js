Package.describe({
	summary: "Utils"
});

Package.on_use(function(api, where) {
	api.use([
		'jquery',

		'templating',

		'app-debug'
	]);

	api.add_files('utils.js', ['client', 'server']);
	api.add_files('client_utils.js', 'client');

	api.export('Utils');
});
