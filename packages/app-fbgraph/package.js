Npm.depends({'fbgraph': '0.2.10'});

Package.describe({
	summary: "Wrapper for npm fbgraph package"
});

Package.on_use(function(api) {
	api.add_files('fbgraph.js', ['client', 'server']);

	api.export('fbgraph');
});
