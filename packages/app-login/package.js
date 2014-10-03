Package.describe({
	summary: "Login",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use([
		'app-debug',
		'app-utils',
		'app-users',
		'app-feeds'
	]);

	api.use([
		'jquery',
		'templating',
		'responsive-modal'
	]);
	api.addFiles([
		'views/login_modal.html',
		'views/login_modal_button.html',
		'views/feed_select_modal.html',
		'views/zip_select_modal.html',
		'login.js'
	], 'client');
});
