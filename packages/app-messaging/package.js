Package.describe({
	summary: "Messaging"
});

Package.on_use(function(api) {
	api.use(['underscore', 'templating', 'blaze-layout', 'roles']);
	//api.use(['iron-router', 'fast-render']);
	api.use(['collection-hooks', 'simple-schema', 'collection2']);
	api.use('app-schemas');

	//api.add_files('js/controller.js', ['client', 'server']);
	api.add_files([
		'collections/conversations.js',
		'collections/messages.js'
	], ['client', 'server']);
	api.add_files(['messaging.html'], 'client');
	api.add_files('messaging.js', 'client');

	api.export('Messages');
	api.export('Conversations');
});
