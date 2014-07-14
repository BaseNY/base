// Npm.depends({'aws-sdk': '2.0.6'});

Package.describe({
	summary: "SDK for AWS services including Amazon S3, Amazon EC2, DynamoDB, and Amazon SWF"
});

Package.on_use(function(api) {
	api.add_files('aws-sdk.min.js', 'client');
	//api.add_files('server.js', 'server');

	//api.export('AWS');
});
