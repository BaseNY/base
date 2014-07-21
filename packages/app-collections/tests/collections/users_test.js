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
						accessToken: 'CAAJcPChHT4oBAOgeHq84p0IT0VzoHITCaF19smYE377oZAfhQ9jKhC3ItdaZAU1qC7ZA8bDE2HQypvJVN2j2HPqwpSkBDnomXB16brAEvbNKvSq7V9vX0vzs4mmL3WZB1qhZCjKsxgpJI4elkOwZAjbuZAXtiJn1ONQFQmmZBZAZBEYFTS9zyVvN1ZAJ7yhjZCrUG6yW3uOe7a418AhCoBha447X',
						expiresAt: 1411158228525,
						id: '334283563393546',
						email: 'dwlnalz_chengwitz_1404674155@tfbnw.net',
						name: 'Rick Amdcegaegfhh Chengwitz',
						first_name: 'Rick',
						last_name: 'Chengwitz',
						link: 'https://www.facebook.com/app_scoped_user_id/334283563393546/',
						gender: 'male',
						locale: 'en_US'
					},
					resume: {
						loginTokens: [{
							when: new Date('2014-07-21T20:23:49.956Z'),
							hashedToken: 'MlHKkFs6C6FPjDwTYnmOViYW9JagREdLuYvuL+d8o+4='
						}]
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
				test.isUndefined(err, "Expected no error to occur: " + err);
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
				test.isTrue(err instanceof Error, "Expected an error denying the update of this user because the modified fields aren't allowed");
			}));
		},
		function(test, expect) {
			Users.update(testUserId, {
				$set: {'friendIds': []}
			}, expect(function(err, numModified) {
				test.isTrue(err instanceof Error, "Expected an error denying the update of this user because this user is trying to update another user");
			}));
		}
	]);

	Tinytest.addAsync("Users - Subscribe to user data", function(test, next) {
		Meteor.subscribe('userData', function(err) {
			test.isUndefined(err, "Expected no error to occur: " + err);
			test.isTrue(Meteor.user().subscribed instanceof Array, "Expected the user's feeds to be published");
			next();
		});
	});

	Tinytest.addAsync("Users - Update subscribed feeds", function(test, next) {
		var newFeeds = ['wotid', 'yoo'];
		Users.updateFeeds(newFeeds, function(err, numModified) {
			test.isUndefined(err, "Expected no error to occur: " + err);
			test.equal(numModified, 1, "Expected one document to be modified");
			test.equal(Meteor.user().subscribed, newFeeds, "Expected user's feeds to be updated");
			next();
		});
	});
}
