var both = ['client', 'server'];

Package.describe({
	summary: "Collections"
});

Package.on_use(function(api) {
	// ========= SETUP =========

	api.use(['app-debug', 'app-utils']);

	api.use([
		'simple-schema',
		'collection2',
		'collection-hooks',
		'collection-helpers',
		'roles'
	]);

	api.add_files('schemas.js', both);
	api.export('Schemas');

	// ========= COLLECTIONS =========

	api.use([
		'accounts-base',
		'app-fbgraph',
		'app-email'
	]);
	// is server because Accounts.onCreateUser is only on server
	api.add_files('collections/users.js', 'server');

	api.add_files([
		'collections/feeds.js',
		'collections/conversations.js',
		'collections/messages.js',
		'collections/offers.js',
		'collections/items.js',
		'collections/notifications.js',
		'collections/comments.js'
	], both);

	api.export(['Feeds', 'Conversations', 'Messages', 'Offers', 'Items', 'Notifications', 'Comments']);

	// ========= PUBLICATIONS AND FIXTURES =========

	api.add_files([
		'publications.js',
		'fixtures.js'
	], 'server');
});
