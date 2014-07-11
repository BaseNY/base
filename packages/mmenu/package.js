Package.describe({
	summary: "The best jQuery plugin for app look-alike on- and off-canvas menus with sliding submenus for your website and webapp."
});

Package.on_use(function(api) {
	api.use('jquery');

	api.add_files([
		'jquery.mmenu.all.css',
		'jquery.mmenu.min.all.js'
	], 'client');
});
