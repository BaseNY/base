Package.describe({
	summary: "Login"
});

Package.on_use(function(api) {
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
	api.add_files([
		'views/login_modal.html',
		'views/login_modal_button.html',
		'views/feed_select_modal.html',
		'views/zip_select_modal.html',
		'login.js'
	], 'client');
});
