Package.describe({
	summary: "Posts",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use([
		'app-debug',
		'app-utils',

		'app-aws'
	]);

	api.use([
		'aldeed:simple-schema@1.0.3',
		'aldeed:collection2@2.1.0',

		'app-collections'
	]);

	api.use([
		'jquery',
		'templating',
		'spacebars'
	]);
	api.add_files([
		'views/post_page.html'
	], 'client');

	api.use([
		'iron:router@0.9.4',
		'meteorhacks:fast-render@1.1.2'
	]);
	api.add_files('routing.js', ['client', 'server']);
});
