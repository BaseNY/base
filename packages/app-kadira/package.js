Package.describe({
	summary: "Kadira setup"
});

Package.on_use(function(api) {
	api.use('kadira');
	api.add_files('kadira.js', 'server');
});
