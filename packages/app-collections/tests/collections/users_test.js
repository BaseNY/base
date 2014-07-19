if (Meteor.isClient) {
	Tinytest.addAsync('Users - Login with Facebook', function(test, next) {
		if (!Meteor.isLoggedIn() && Accounts.loginServicesConfigured()) {
			Users.loginWithFacebook(function(err) {
				test.isUndefined(err, err);
				var user = Users.findOne(Meteor.userId());
				test.equal(user._id, Meteor.userId(), 'User not found');
				test.equal(Users.find().count(), 1, 'There should be one user created');
				next();
			});
		} else {
			next();
		}
	});

	Tinytest.addAsync('Users - User data subscription', function(test, next) {
		Meteor.subscribe('userData', function(err) {
			test.isUndefined(err, err);
			var user = Meteor.user();
			test.notEqual(user.subscribed, undefined, 'User feeds should be subscribed to');
			next();
		});
	});

	Tinytest.addAsync('Users - Update subscribed feeds', function(test, next) {
		var newFeeds = ['wotid', 'yoo'];
		Users.updateFeeds(newFeeds, function(err, res) {
			test.isUndefined(err, err);
			test.equal(res, 1, 'Only one document should be affected');
			var feeds = Meteor.user().subscribed;
			test.equal(feeds, newFeeds, 'Feeds should be equal');
			next();
		});
	});
}
