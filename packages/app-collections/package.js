var both = ['client', 'server'];

Package.describe({
	summary: "Collections"
});

Package.on_use(function(api) {
	// ========= SETUP =========
	api.use([
		'lodash',

		'app-debug',
		'app-utils'
	]);

	api.add_files('collections.js', both);

	api.use([
		'simple-schema',
		'collection2',
		'collection-hooks',
		'collection-helpers',
		'roles'
	]);

	api.add_files('schemas.js', both);
	api.export('Schemas');

	// ========= CONFIG =========

	api.use('service-configuration');
	api.add_files('config.js', 'server');

	// ========= COLLECTIONS =========

	api.use([
		'accounts-base',
		'accounts-facebook',
		'app-fbgraph',
		'app-email'
	]);
	// is server because Accounts.onCreateUser is only on server
	api.add_files('collections/users.js', both);

	api.add_files([
		'collections/feeds.js',
		'collections/conversations.js',
		'collections/messages.js',
		'collections/offers.js',
		'collections/posts.js',
		'collections/notifications.js',
		'collections/comments.js'
	], both);

	api.export(['Users', 'Feeds', 'Conversations', 'Messages', 'Offers', 'Posts', 'Notifications', 'Comments']);

	// ========= PUBLICATIONS AND FIXTURES =========

	api.use('smart-publish');

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
		'tests/collections/feeds_test.js',
		'tests/collections/posts_test.js',
		'tests/collections/offers_test.js'
	], both);
});
