Package.describe({
	summary: "Main package for setting up everything"
});

Package.on_use(function(api) {
	api.use([
		'lodash',

		'iron-router'
	]);

	api.add_files([
		'main.js',
		'routing.js'
	], ['client', 'server']);
});
