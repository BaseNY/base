/**
 * NOTE: remember to update both client and server aws-sdk
 */

Npm.depends({
	'aws-sdk': '2.0.18'
});

Package.describe({
	summary: "SDK for AWS services including Amazon S3, Amazon EC2, DynamoDB, and Amazon SWF",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.0');
	api.add_files('aws-sdk_client.js', 'client');
	api.add_files('aws-sdk_server.js', 'server');
	api.export('AWS', 'server'); // only on server because for some reason it messes up client
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('aws');
	api.addFiles('tests/aws_test.js', ['client', 'server']);
});
