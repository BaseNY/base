Package.describe({
	summary: "Main package for setting up everything"
});

Package.on_use(function(api) {
	api.use(['lodash']);

	api.add_files('main.js', ['client', 'server']);
});
