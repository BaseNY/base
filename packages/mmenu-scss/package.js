Package.describe({
	summary: "The best jQuery plugin for app look-alike on- and off-canvas menus with sliding submenus for your website and webapp.",
	version: "0.1.0"
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.3.1');

	api.use('jquery');

	api.add_files('jquery.mmenu.min.all.js', 'client');
});
