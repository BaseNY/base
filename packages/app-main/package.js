Package.describe({
	summary: "Main package"
});

Package.on_use(function(api) {
	api.use([
		'jquery',

		'iron-router',
		'fast-render',

		'meteor',
		'session',
		'templating',

		'app-debug',
		'app-fbgraph',
		'app-feed',
		'app-home',
		'app-login',
		'app-messaging',
		'app-offers',
		'app-posts',
		'app-schemas',
		'app-setup',
		'app-users',
		'app-utils'
	]);

	api.add_files('collections/notifications.js', ['client', 'server']);

	api.add_files([
		'views/subscriptions.js',

		'views/about/about.html',
		'views/signup/badges.html',
		'views/signup/badges.js',
		'views/signup/referral.html',
		'views/signup/signup.html',
		'views/signup/signup.js',
		'views/profile.html',

		'views/main.html',
		'views/main.js'
	],'client');

	api.add_files([
		'lib/aws.js',
		'lib/router.js',
		'lib/seo.js'
	], ['client', 'server']);

	api.add_files([
		'server/publications.js',
		'server/server.js'
	], 'server');
});
