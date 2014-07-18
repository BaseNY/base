var both = ['client', 'server'];

Package.describe({
	summary: "Messaging"
});

Package.on_use(function(api) {
	api.use([
		'lodash',
		'jquery',
		'velocityjs',

		'meteor',
		'templating',
		'blaze-layout',

		'iron-router',
		'fast-render',

		'app-debug',
		'app-utils',
		'app-collections',
        'app-aws'
	]);

	api.add_files('server/publications.js', 'server');
	api.add_files('routing.js', both);
	api.add_files([
		'views/messaging.html',
		'views/messaging.js'
	], 'client');
});

Package.on_test(function(api) {
	api.use(['app-messaging', 'tinytest', 'test-helpers']);
	api.add_files(['tests/conversations_test.js'], both);
});
