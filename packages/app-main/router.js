Debug.order('app-main/router.js');

Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home'
	});
});
