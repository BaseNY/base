Package.describe({
	summary: "AWS setup",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use('app-debug');

	api.use('stevezhu:aws-sdk@2.0.18');
	api.addFiles('aws.js', 'client'); // aws is available on both, but we're only using it on client
	api.export('S3', 'client');
});
