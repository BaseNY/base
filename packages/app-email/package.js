Package.describe({
	summary: "Email",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use([
		'email',

		'cmather:handlebars-server@2.0.0',

		'app-debug'
	]);
	api.addFiles([
		'email.handlebars',
		'email.js'
	], 'server');
	api.export('Email');
});
