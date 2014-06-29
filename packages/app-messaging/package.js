Package.describe({
	summary: "Messaging"
});

Package.on_use(function(api) {
	api.use('underscore');

	api.use('templating');
	api.use('blaze-layout');
	api.use('roles');
	//api.use('iron-router');
	//api.use('fast-render');

	api.use('collection-hooks');

	api.use('simple-schema');
	api.use('collection2');
	api.use('app-schemas');

	api.add_files(['messaging.html'], 'client');

	api.add_files([
		'collections/conversations.js',
		'collections/messages.js'
	], ['client', 'server']);
	//api.add_files('js/controller.js', ['client', 'server']);
	api.add_files('messaging.js', 'client');

	api.export('Messages');
	api.export('Conversations');
});
