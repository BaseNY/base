// regarding the fb friends updating
// maybe we still should do a complete update every month or something
// because it is possible that the site is down when fb sends the post request

Package.describe({
	summary: "Users, account creation, login"
});

Package.on_use(function(api) {
	api.use([
		'npm',
		'underscore',

		'meteor',

		'accounts-base',
		'service-configuration',

		'simple-schema',

		'app-fbgraph',
		'app-utils',
		'app-schemas',
		'app-feed'
	]);

	api.add_files('js/config.js', 'server');
	api.add_files('collections/users.js', 'server');
	api.add_files('fixtures.js', 'server');
});
