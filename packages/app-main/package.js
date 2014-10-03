var both = ['client', 'server'];

Package.describe({
	summary: "Main package"
});

Package.onUse(function(api) {
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

	api.addFiles('server/server.js', 'server');

	api.use([
		'jquery',
		'templating',
		'blaze-layout'
	]);
	api.addFiles([
		'views/about/about.html',
		'views/signup/referral.html',
		'views/signup/signup.html',
		'views/signup/signup.js',

		'views/header.html',
		'views/main.html',
		'views/main.js',

		'views/google_analytics.js'
	], 'client');

	api.addFiles([
		'lib/seo.js'
	], ['client', 'server']);

	api.use([
		'iron:router@0.9.4',
		'meteorhacks:fast-render@1.1.2'
	]);
	api.addFiles([
		'router.js'
	], both);

});
