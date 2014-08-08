Package.describe({
	summary: "Email"
});

Package.on_use(function(api) {
	api.use('app-debug');

	api.use([
		'email',
		'handlebars-server'
	]);

	api.add_files([
		'email.handlebars',
		'email.js'
	], 'server');

	api.export('Email');
});
