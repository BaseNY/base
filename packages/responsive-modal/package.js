Package.describe({
	summary: "A responsive modal"
});

Package.on_use(function(api, where) {
	api.use([
		'lodash',
		'jquery',

		'bourbon',

		'velocityjs'
	]);

	api.add_files([
		'responsive-modal.css',
		'responsive-modal.js',
	], 'client');
});
