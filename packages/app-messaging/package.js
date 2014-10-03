var both = ['client', 'server'];

Package.describe({
	summary: "Messaging",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use([
		'stevezhu:lodash@0.2.0',
		'jquery',
		'stevezhu:velocity.js@0.1.0',

		'meteor',
		'templating',

		'iron:router@0.9.4',
		'meteorhacks:fast-render@1.1.2',

		'app-debug',
		'app-utils',
		'app-collections',
        'app-aws'
	]);

	api.add_files('routing.js', both);
	api.add_files([
		'views/messaging.html',
		'views/messaging.js'
	], 'client');
});

Package.onTest(function(api) {
	api.use(['app-messaging', 'tinytest', 'test-helpers']);
	api.add_files(['tests/conversations_test.js'], both);
});
