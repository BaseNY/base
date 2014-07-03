Package.describe({
	summary: "Utils"
});

Package.on_use(function(api, where) {
	api.use([
		'templating'
	]);

	api.add_files('utils.js', ['client', 'server']);

	api.export('Utils');
});
