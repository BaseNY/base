Package.describe({
	summary: "Accelerated JavaScript animation"
});

Package.on_use(function(api) {
	api.add_files('jquery.velocity.min.js', 'client');
});
