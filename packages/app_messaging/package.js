Package.describe({
	summary: "Messaging"
});

Package.on_use(function(api, where) {
	//api.use('blaze-layout');

	api.add_files([
		'js/messaging.js'
	], 'client');

	api.add_files([
		'views/main.html',
		'views/conversation.html',
		'views/sidebar.html'
	], 'client');
});
