var both = ['client', 'server'];

Package.describe({
	summary: "Collections",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	// ========= SETUP =========

	api.use('app-standard');

	api.use('app-utils');

	api.use([
		'aldeed:simple-schema@1.0.3',
		'aldeed:collection2@2.1.0',
		'matb33:collection-hooks@0.7.6',
		'dburles:collection-helpers@1.0.0',
		'alanning:roles@1.2.13'
	]);

	api.addFiles('schemas.js', both);
	api.export('Schemas');

	// ========= CONFIG =========

	api.use('service-configuration');
	api.addFiles('config.js', 'server');

	// ========= COLLECTIONS =========

	api.use([
		'accounts-base',
		'accounts-facebook',
		'app-email'
	]);
	api.imply('stevezhu:fbgraph@1.1.0');
	api.use('stevezhu:fbgraph@1.1.0');
	// is server because Accounts.onCreateUser is only on server
	api.addFiles('collections/users.js', 'server');

	api.addFiles([
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

	api.use('publish-with-relations');

	api.addFiles([
		'publications.js',
		'fixtures.js'
	], 'server');
});
