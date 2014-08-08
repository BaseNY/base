var both = ['client', 'server'];

Package.describe({
	summary: "Collections"
});

Package.on_use(function(api) {
	// ========= SETUP =========
	api.use('app-debug');

	api.use('lodash');

	api.add_files('schemas.js', both);
	api.export('Schemas');

	// ========= CONFIG =========

	api.use('service-configuration');
	api.add_files('user_config.js', 'server');

	// ========= COLLECTIONS =========

	api.use([
		'simple-schema',
		'collection2',
		'collection-hooks',
		'collection-helpers',
		'roles'
	]);

	api.use([
		'accounts-base',
		'accounts-facebook',
		//'app-fbgraph',
		'app-email'
	]);
	api.add_files('collections/users.js', both);

	api.add_files([
		'collections/feeds.js'/*,
		'collections/conversations.js',
		'collections/messages.js',
		'collections/offers.js',
		'collections/items.js',
		'collections/notifications.js',
		'collections/comments.js'*/
	], both);

	//api.export(['Feeds', 'Conversations', 'Messages', 'Offers', 'Items', 'Notifications', 'Comments']);
	api.export([
		'Users',
		'Feeds'
	]);

	// ========= PUBLICATIONS AND FIXTURES =========

	api.use([
		'app-utils',
		'smart-publish'
	]);

	api.add_files([
		'publications.js',
		'fixtures.js'
	], 'server');
});

Package.on_test(function(api) {
	api.use([
		'app-debug',
		'app-email',

		'app-collections',
		'tinytest',
		'test-helpers',

		'accounts-base',
		'service-configuration',
		'roles'
	]);

	api.add_files([
		'tests/collections/users_test.js',
		'tests/collections/feeds_test.js'/*,
		'tests/collections/posts_test.js',
		'tests/collections/offers_test.js'*/
	], both);
});
