var both = ['client', 'server'];

Package.describe({
	summary: "Messaging"
});

Package.on_use(function(api) {
	api.use([
		'lodash',

		'meteor',

		'templating',
		'blaze-layout',

		'roles',
		'collection-hooks',
		'simple-schema',
		'collection2',
		'check',

		'fast-render',

		'app-main',
		'app-utils',
		'app-schemas'
	]);
	//api.use(['iron-router', 'fast-render']);

	api.add_files([
		'collections/conversations.js',
		'collections/messages.js',
	], both);
	api.add_files('publications.js', 'server');
	api.add_files('controller.js', both);
	api.add_files(['messaging.html', 'messaging.js'], 'client');

	api.export('Messages');
	api.export('Conversations');
	api.export('MessagingController');
});

Package.on_test(function(api) {
	api.use(['app-messaging', 'tinytest', 'test-helpers']);
	api.add_files(['tests/conversations_test.js'], both);
});
