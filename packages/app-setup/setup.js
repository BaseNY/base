Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [
			Meteor.subscribe('feeds'),
			Meteor.subscribe('notifs'),
			Meteor.subscribe('userData'),
			Meteor.subscribe('allUserData')
		];
	}
});

/*
var BeforeHooks = {
	isLoggedIn: function(pause) {
		if (Meteor.isClient && !Meteor.isLoggedIn()) {
			this.redirect('/');
			pause();
		}
	}
};

Router.onBeforeAction(BeforeHooks.isLoggedIn, {only: ['messages', 'message']});
*/
