Feeds.newRoute = {
	onRun: function(filter) {
		var subs = [];
		if (Meteor.isClient) {
			var user = Meteor.user();

                        if(!filter)
				filter = {};

			if (user && Session.equals('degree', 'friends')) {
				filter.fbId = {$in: user.friendIds};
			}

			var buy = Session.get('buy'),
				sell = Session.get('sell');

			Debug.home('app-feeds - Feeds.waitOn', {buy: buy, sell: sell, degree: Session.get('degree')});

			// can't subscribe to items because neither buy nor sell is selected
			if (!buy && !sell) {
				filter = {_id: null};
			} else if (!(buy && sell)) {
				if (buy) {
                    _.extend(filter, {
                        buy: {$exists: true}
                    });
				} else if (sell) {
                    _.extend(filter, {
                        buy: {$exists: false}
                    });
				}
			}

            return Meteor.subscribe('smartPosts', filter, 10);
		}
	}
}

Feeds.route = {
	/*waitOn: function(filter) {
		var subs = [
			Meteor.subscribe('feeds')
		];
		if (Meteor.isClient) {
			var user = Meteor.user();

			if (!filter) {
				filter = {};
			}

			if (user && Session.equals('degree', 'friends')) {
				filter.fbId = {$in: user.friendIds};
			}

			var buy = Session.get('buy'),
				sell = Session.get('sell');

			Debug.home('app-feeds - Feeds.waitOn', {buy: buy, sell: sell, degree: Session.get('degree')});

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

			subs.push(Meteor.subscribe('items', filter, {sort: {score: -1}, limit: Session.get('itemsLimit')}));
		}
		return subs;
	},*/
	data: function() {
		var posts = Items.find({}, {sort: {score: -1}}).fetch();
		return {
			posts: posts
		};
	}
};
