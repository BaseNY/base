Package.describe({
	summary: "Email"
});

Package.on_use(function(api) {
	api.use([
		'email',
		'handlebars-server',

		'app-debug'
	]);

	api.add_files([
		'email.handlebars',
		'email.js'
	], 'server');

	api.export('Email');
});
