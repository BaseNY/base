Package.describe({
	summary: "For setting up global variables etc"
});

Package.on_use(function(api) {
	api.use([
		'lodash',

		'meteor',

		'iron-router'
	]);

	api.add_files([
		'setup.js'
	], ['client', 'server']);
});
