ProfileController = RouteController.extend({
	fastRender: true,
	waitOn: function() {
		var filter = {
			sellerId: this.params.id
		};

		var buy = Session.get('buy'),
			sell = Session.get('sell');
		if (!buy && !sell) {
			filter = {_id: null};
		} else if (!(buy && sell)) {
			if (buy) {
				filter.buy = {$exists: true};
			} else if (sell) {
				filter.buy = {$exists: false};
			}
		}

		return Meteor.subscribe('items', filter, {sort: {score: -1}, limit: Session.get('ftoiLimit')});
	},
	onAfterAction: function() {
		document.title = Meteor.users.findOne({_id: this.params.id}).profile.name;
	},
	data: function() {
		return {
			user: Meteor.users.findOne({_id: this.params.id})
		};
	}
});

Router.map(function() {
	this.route('profile', {
		path: '/profile/:id',
		controller: ProfileController
	});
});
