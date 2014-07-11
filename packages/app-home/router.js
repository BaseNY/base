HomeController = FastRender.RouteController.extend({
	template: 'home',
	waitOn: function() {
		var subs = [
			Meteor.subscribe('feeds')
		];
		// have to check if Meteor.isClient because of Session
		if (Meteor.isClient) {
			var filter = {};
			if (Session.get('degrees')) {
				if (Session.get('sellOn')) {
					filter = {
						$or: [{buy: {$exists: false}}, {buy: {$exists: Session.get('buyOn')}}],
					   fbId: {$in: Meteor.user().profile.friends}
					}
				} else if (Session.get('buyOn')) {
					filter = {buy: true, fbId: {$in: Meteor.user().profile.friends}};
				} else {
					filter = {_id: null};
				}
			} else {
				if (Session.get('sellOn')) {
					filter = {
						$or: [{buy: {$exists: false}}, {buy: {$exists: Session.get('buyOn')}}]
					}
				} else if (Session.get('buyOn')) {
					filter = {buy: true};
				} else {
					filter = {_id: null};
				}
			}

			subs.push(Meteor.subscribe('items', filter, {sort: {score: -1}, limit: 100}));
		}
		if (Meteor.isLoggedIn()) {
			subs.push(Meteor.subscribe('conversations', {_id: {$in: Meteor.user().conversationIds}}));
		}
		return subs;
	},
	onAfterAction: function() {
		document.title = 'Base';
	}
});

Router.map(function() {
	this.route('home', {
		path: '/',
		controller: HomeController
	});
});
