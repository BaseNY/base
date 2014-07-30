Debug.order('app-main/router.js');

Router.configure({
	layoutTemplate: 'layout'
});

var BeforeHooks = {
	isLoggedIn: function(pause) {
		var currentRouter = this;
		var currentRouteName = currentRouter.route.name;
		var isNotLoggedIn = Meteor.isClient && !Meteor.isLoggedIn();

		Debug.log('Router.onBeforeAction', {
			currentRouteName: currentRouteName,
			isNotLoggedIn: isNotLoggedIn
		});

		if (isNotLoggedIn && currentRouteName !== 'home') {
			Router.go('home');
			pause();
		}
	}
};
Router.onBeforeAction(BeforeHooks.isLoggedIn);

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home'
	});
});
