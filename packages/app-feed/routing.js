Router.map(function() {
	this.route('feeds', {
		path: '/feeds/:id',
		template: 'home',
		waitOn: function() {
			var filter = {};
			if (Session.get('sellOn')) {
				filter = {
					_id: {
						$in: Feeds.findOne({
							_id: this.params.id
						}).items
					},
					$or: [{
						buy: {
							$exists: false
						}
					}, {
						buy: {
							$exists: Session.get('buyOn')
						}
					}]
				}
			} else if (Session.get('buyOn')) {
				filter = {
					_id: {
						$in: Feeds.findOne({
							_id: this.params.id
						}).items
					},
					buy: true
				};
			} else {
				filter = {
					_id: null
				};
			}

			return Meteor.subscribe('items', filter, {
				sort: {
					score: -1
				},
				limit: Session.get('ftoiLimit')
			});
		},
		data: function() {
			var feed = Feeds.findOne({
				_id: this.params.id
			});
			return {
				feed: feed,
			};
		},
        onAfterAction: function() {
            document.title = this.data().feed.name;
        }
	});
});
