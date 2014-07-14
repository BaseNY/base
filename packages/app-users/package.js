// regarding the fb friends updating
// maybe we still should do a complete update every month or something
// because it is possible that the site is down when fb sends the post request

Package.describe({
	summary: "Users, account creation, login"
});

Package.on_use(function(api) {
	api.use([
		'app-debug'
	]);

	api.use('service-configuration');
	api.add_files('config.js', 'server');

	api.use([
		'accounts-base',
		'simple-schema',
		'collection2',

		'app-fbgraph',
		'app-email',
		'app-schemas'
	]);
	// is server because Accounts.onCreateUser is only on server
	api.add_files('collections/users.js', 'server');

	api.use([
		'templating',
		'blaze-layout',

		'app-feeds'
	]);
	api.add_files([
		'views/profile.html',

		'views/badges.html',
		'views/badges.js'
	], 'client');
});
