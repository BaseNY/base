var both = ['client', 'server'];

Package.describe({
	summary: "Messaging"
});

Package.on_use(function(api) {
	api.use([
		'underscore',

		'meteor',

		'templating',
		'blaze-layout',

		'roles',
		'collection-hooks',
		'simple-schema',
		'check',

		'app-main',
		'app-utils',
		'app-schemas'
	]);
	//api.use(['iron-router', 'fast-render']);

	//api.add_files('js/controller.js', ['client', 'server']);
	api.add_files([
		'collections/conversations.js',
		'collections/messages.js'
	], both);
	api.add_files(['messaging.html'], 'client');
	api.add_files('messaging.js', 'client');

	api.export('Messages');
	api.export('Conversations');
});

Package.on_test(function(api) {
	api.use(['app-messaging', 'tinytest', 'test-helpers']);
	api.add_files(['tests/conversations_test.js'], both);
});