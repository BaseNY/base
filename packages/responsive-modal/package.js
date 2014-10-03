Package.describe({
	summary: "A responsive modal"
});

Package.onUse(function(api, where) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use([
		'stevezhu:lodash@0.2.0',
		'jquery',

		'bourbon',

		'stevezhu:velocity.js@0.1.0'
	]);

	api.add_files([
		'responsive-modal.js'
	], 'client');
});
