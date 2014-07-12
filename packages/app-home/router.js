HomeController = FastRender.RouteController.extend({
	template: 'home',
	waitOn: function() {
		var subs = [
			Meteor.subscribe('feeds')
		];
		// have to check if Meteor.isClient because of Session
		if (Meteor.isClient && Meteor.isLoggedIn()) {
			// conversations subscription
			var user = Meteor.user();
			subs.push(Meteor.subscribe('conversations', {_id: {$in: user.conversationIds}})); // TODO CHECK WHERE THIS SUBSCRIPTION IS USED

			// item subscription
			var filter = {};

			Debug.home('HomeController', {degree: Session.get('degree')});
			if (Session.equals('degree', 'friends')) {
				filter.fbId = {$in: user.friendIds};
			}

			var buy = Session.get('buy'),
				sell = Session.get('sell');
			Debug.home('HomeController', {buy: buy, sell: sell});
			console.log(!buy && !sell);

			// can't subscribe to items because neither buy nor sell is selected
			if (!buy && !sell) {
				filter = {_id: null};
			} else if (!(buy && sell)) {
				if (buy) {
					filter.buy = {$exists: true};
				} else if (sell) {
					filter.buy = {$exists: false};
				}
			}

			subs.push(Meteor.subscribe('items', filter, {sort: {score: -1}, limit: 100}));
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
