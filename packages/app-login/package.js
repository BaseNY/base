Package.describe({
	summary: "Login"
});

Package.on_use(function(api) {
	api.use([
		'jquery',

		'templating',

		'responsive-modal',

		'app-utils'
	]);

	api.add_files([
		'views/login_modal.html',
		'views/login_modal_button.html',
		'views/feed_select_modal.html',
		'views/zip_select_modal.html',
		'login.js'
	], 'client');
});
