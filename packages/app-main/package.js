var both = ['client', 'server'];

Package.describe({
	summary: "Main package"
});

Package.on_use(function(api) {
	api.use(['meteor', 'session']);
	api.add_files('setup.js', 'client');

	api.use([
		'app-debug',
		'app-utils',

		'app-email', // server

		'app-fbgraph'
	]);

	api.use([
		'app-collections',
		'app-feeds',
		'app-users',
		'app-posts',
		'app-home',
		'app-messaging',
		'app-login',
		'app-menu'
	]);

	api.add_files('server/server.js', 'server');

	api.use([
		'jquery',
		'templating',
	]);
	api.add_files([
		'views/about/about.html',
		'views/signup/referral.html',
		'views/signup/signup.html',
		'views/signup/signup.js',
		'views/signup/start.html',

		'views/header.html',
		'views/main.html',
		'views/main.js',

		'views/google_analytics.js'
	], 'client');

	api.add_files([
		'lib/seo.js'
	], ['client', 'server']);

	api.use([
		'iron-router',
		'fast-render'
	]);
	api.add_files([
		'router.js'
	], both);

});
