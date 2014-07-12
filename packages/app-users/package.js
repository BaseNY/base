// regarding the fb friends updating
// maybe we still should do a complete update every month or something
// because it is possible that the site is down when fb sends the post request

Package.describe({
	summary: "Users, account creation, login"
});

Package.on_use(function(api) {
	api.use([
		'npm',
		'lodash',

		'meteor',
		'templating',

		'iron-router',
		'fast-render',

		'accounts-base',
		'service-configuration',

		'simple-schema',
		'check',
		'collection-helpers',

		'app-debug',
		'app-setup',
		'app-fbgraph',
		'app-utils',
		'app-schemas',
		'app-feed'
	]);

	api.add_files([
		'config.js',
		'collections/users.js', // is server because Accounts.onCreateUser is only on server
		'publications.js'
	], 'server');
	api.add_files('router.js', ['client', 'server']);
	//api.add_files('fixtures.js', 'server');
});
