var testUserId = 'e8e1043777c76b99a6fd728d';

if (Meteor.isServer) {
	// set function to empty because don't want to send emails for tests
	Email.sendWelcomeEmail = function() {};

	Tinytest.add("Users - Insert test user", function(test) {
		if (!Users.findOne(testUserId)) {
			Users.insert({
				_id: testUserId,
				services: {
					facebook: {
						id: (new Meteor.Collection.ObjectID)._str,
						email: 'email@email.com',
						gender: 'male',
						first_name: 'First',
						last_name: 'Last',
						name: 'First Last',
						img: 'image url'
					}
				}
			});
			test.isTrue(Users.findOne(testUserId) instanceof Object, "Expected the test user to be created");
		}
	});
}

if (Meteor.isClient) {
	Tinytest.addAsync("Users - Service configuration for Facebook is loaded", function(test, next) {
		var configs = [];

		// tries to get the service configuration every 100 milliseconds
		var intervalId = setInterval(function() {
			configs = ServiceConfiguration.configurations.find().fetch();
			if (configs.length > 0) {
				clearInterval(intervalId);
				intervalId = undefined;
				next();
			}
		}, 100);

		// stops the setInterval after 5 seconds
		setTimeout(function() {
			if (intervalId) {
				test.equal(configs.length, 1, "Expected service configuration to exist");
				clearInterval(intervalId);
				next();
			}
		}, 5000);
	});

	Tinytest.addAsync("Users - Login with Facebook", function(test, next) {
		if (!Meteor.isLoggedIn()) {
			Users.loginWithFacebook(function(err) {
				test.isUndefined(err, err);
				var user = Users.findOne(Meteor.userId());
				test.equal(user._id, Meteor.userId(), "Expected user to be found");
				test.equal(Users.find().count(), 1, "Expected one user to be created");
				next();
			});
		} else {
			next();
		}
	});

	testAsyncMulti("Users - Allow update", [
		function(test, expect) {
			Users.update(Meteor.userId(), {
				$set: {'friendIds': []}
			}, expect(function(err, numModified) {
				test.isTrue(err instanceof Meteor.Error, "Expected an error denying the update of this user because the modified fields aren't allowed");
			}));
		},
		function(test, expect) {
			Users.update(testUserId, {
				$set: {'friendIds': []}
			}, expect(function(err, numModified) {
				test.isTrue(err instanceof Meteor.Error, "Expected an error denying the update of this user because this user is trying to update another user");
			}));
		}
	]);

	Tinytest.addAsync("Users - User data subscription", function(test, next) {
		Meteor.subscribe('userData', function(err) {
			test.isUndefined(err, err);
			test.isTrue(Meteor.user().subscribed instanceof Array, "Expected the user's feeds to be published");
			next();
		});
	});

	Tinytest.addAsync("Users - Update subscribed feeds", function(test, next) {
		var newFeeds = ['wotid', 'yoo'];
		Users.updateFeeds(newFeeds, function(err, numModified) {
			test.isUndefined(err, err);
			test.equal(numModified, 1, "Expected one document to be modified");
			test.equal(Meteor.user().subscribed, newFeeds, "Expected user's feeds to be updated");
			next();
		});
	});
}
