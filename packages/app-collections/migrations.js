var MULTI = {
	multi: true
};

Migrations.add({
	version: 1,
	up: function() {
		Feeds.update({}, {
			$set: {
				createdAt: new Date
			}
		}, MULTI);

		Users.find().forEach(function(user) {
			Users.update(user._id, {
				$rename: {
					'subscribed': 'feedIds'
				},
				$set: {
					'profile.img': user.img.replace('picture?width=100&height=100', '')
				},
				$unset: {
					new: ''
				}
			});
		});
	},
	down: function() {
		Feeds.update({}, {
			$unset: {
				createdAt: ''
			}
		}, MULTI);

		Users.find().forEach(function(user) {
			Users.update(user._id, {
				$rename: {
					'feedIds': 'subscribed'
				},
				$set: {
					new: 0,
					'profile.img': user.img + 'picture?width=100&height=100'
				}
			});
		});
	}
});
