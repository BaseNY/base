Package.describe({
	summary: "Utils"
});

Package.on_use(function(api, where) {
	api.use('app-debug');

	api.use('accounts-base');
	api.add_files('utils.js', ['client', 'server']);
});
