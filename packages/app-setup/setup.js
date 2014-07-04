Meteor._ensure(Meteor, 'settings', 'public');

var BeforeHooks = {
	isLoggedIn: function(pause) {
		if (Meteor.isClient && !Meteor.isLoggedIn()) {
			this.redirect('/');
			pause();
		}
	}
};

Router.onBeforeAction(BeforeHooks.isLoggedIn, {only: ['messages', 'message']});
