Package.describe({
	summary: "AWS"
});

Package.on_use(function(api) {
	api.use('app-debug');

	api.use('aws');

	api.add_files('aws.js', 'client');

	api.export('S3');
});
