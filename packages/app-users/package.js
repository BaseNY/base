// regarding the fb friends updating
// maybe we still should do a complete update every month or something
// because it is possible that the site is down when fb sends the post request

Package.describe({
	summary: "Users, account creation, login",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use('app-debug');

	api.use('app-collections');

	api.use([
		'templating',

		'app-feeds'
	]);
	api.addFiles([
		'views/profile.html',

		'views/badges.html',
		'views/badges.js'
	], 'client');
});
