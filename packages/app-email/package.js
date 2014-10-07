Package.describe({
	summary: "Email"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use('app-standard');

	api.use('cmather:handlebars-server@2.0.0');
	api.addFiles([
		'email_welcome.handlebars',
		'email.js'
	], 'server');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('app-email');
});
