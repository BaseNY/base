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

		'roles',
		'simple-schema',
		'collection2',
		'collection-hooks',
		'collection-helpers',
		'check',

		'iron-router',
		'fast-render',

		'app-setup',
		'app-utils',
		'app-schemas'
	]);

	api.add_files([
		'collections/conversations.js',
		'collections/messages.js',
	], both);
	api.add_files('server/publications.js', 'server');
	api.add_files('routing.js', both);
	api.add_files([
		'views/messaging.html',
		'views/messaging.js'
	], 'client');

	api.export('Messages');
	api.export('Conversations');
});

Package.on_test(function(api) {
	api.use(['app-messaging', 'tinytest', 'test-helpers']);
	api.add_files(['tests/conversations_test.js'], both);
});
