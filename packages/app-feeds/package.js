Package.describe({
	summary: "Feed",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use('session');
	api.addFiles('setup.js', 'client');

	api.use([
		'app-debug',
		'app-utils',

		'app-aws'
	]);

	api.use([
		'aldeed:simple-schema@1.0.3',
		'aldeed:collection2@2.1.0',

		'app-collections'
	]);

	api.use([
		'jquery',
		'stevezhu:velocity.js@0.1.0',

		'templating',
		'reactive-dict'
	]);
	api.addFiles([
		'views/feed_post_form.html',
		'views/feed_post_form.js',
		'views/feed_post.html',
		'views/feed_post.js',
		'views/feed.html',
		'views/feed.js'
	], 'client');

	api.use([
		'iron:router@0.9.1',
		'meteorhacks:fast-render@1.1.2'
	]);
	api.addFiles('router.js', ['client', 'server']);
});
