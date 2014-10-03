Package.describe({
	summary: "Kadira",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');
	api.use('meteorhacks:kadira@2.10.1');
	api.addFiles('kadira.js', 'server');
});
