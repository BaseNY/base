var both = ['client', 'server'];

Package.describe({
	summary: "Home"
});

Package.on_use(function(api) {
	api.use('app-debug');

	api.use('templating');
	api.add_files([
		'views/home.html',
		'views/home.js'
	], 'client');
});
