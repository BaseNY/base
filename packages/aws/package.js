Npm.depends({'aws-sdk': '2.0.7'});

Package.describe({
	summary: "SDK for AWS services including Amazon S3, Amazon EC2, DynamoDB, and Amazon SWF"
});

Package.on_use(function(api) {
	api.add_files('client.js', 'client');
	api.add_files('server.js', 'server');

	api.export('AWS');
});
