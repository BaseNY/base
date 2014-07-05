var BeforeHooks = {
	isLoggedIn: function(pause) {
		console.log("wot");
		if (Meteor.isClient && !Meteor.isLoggedIn()) {
			this.redirect('/');
			pause();
		}
	}
};

Router.onBeforeAction(BeforeHooks.isLoggedIn, {only: ['messages', 'message']});
