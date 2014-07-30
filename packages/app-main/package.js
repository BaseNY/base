var both = ['client', 'server'];

Package.describe({
	summary: "Main package"
});

Package.on_use(function(api) {
	api.use(['app-debug', 'app-utils']);



	api.use('app-home');



	api.use('templating');
	api.add_files([
		'views/header.html',
		'views/main.html',
		'views/main.js',

		'main.css'
	], 'client');

	api.use('iron-router');
	api.add_files('router.js', both);
});
