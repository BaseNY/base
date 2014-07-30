var both = ['client', 'server'];

Package.describe({
	summary: "Main package"
});

Package.on_use(function(api) {
	api.use('iron-router');
	api.add_files('router.js', both);
});
