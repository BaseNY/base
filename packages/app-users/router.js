Router.map(function() {
	this.route('profile', {
		path: '/profile/:id',
		waitOn: function() {
			var filter = '';
			if (Session.get('buyOn') && !Session.get('sellOn')) {
				filter = {
					sellerId: this.params.id,
					buy: true
				};
			} else if (Session.get('sellOn') && !Session.get('buyOn')) {
				filter = {
					sellerId: this.params.id,
					$or: [{
						buy: {
							$exists: false
						}
					}, {
						buy: true
					}]
				};
			} else {
				filter = {
					sellerId: this.params.id
				};
			}

			return Meteor.subscribe('items', filter, {
				sort: {
					score: -1
				},
				limit: Session.get('ftoiLimit')
			});
		},
		onAfterAction: function() {
			document.title = Meteor.users.findOne({
				_id: this.params.id
			}).profile.name;
		},
		data: function() {
			return {
				user: Meteor.users.findOne({
					_id: this.params.id
				})
			};
		}
	});
});
