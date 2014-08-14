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

	api.use('app-collections');

	api.use([
		'templating',

		'app-feeds'
	]);
	api.add_files([
		'views/profile.html',

		'views/badges.html',
		'views/badges.js'
	], 'client');
});
