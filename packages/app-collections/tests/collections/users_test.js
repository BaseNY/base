// ================== SETUP ==================

if (Meteor.isServer) {
	// set function to empty because don't want to send emails for tests
	Email.sendWelcomeEmail = function() {};

	Accounts.registerLoginHandler(function(loginRequest) {
		return {
			userId: loginRequest.userId
		}
	});
}
if (Meteor.isClient) {
	var testLogin = function(userId, callback) {
		var loginRequest = {
			userId: userId
		};
		Accounts.callLoginMethod({
			methodArguments: [loginRequest],
			userCallback: callback
		});
	};
}

// ================== TESTS ==================

var testUserId = '1';

if (Meteor.isServer) {
	var testUsers = [{
		_id: testUserId,
		services: {
			facebook: {
				id: '334283563393546',
				email: 'dwlnalz_chengwitz_1404674155@tfbnw.net',
				name: 'Rick Amdcegaegfhh Chengwitz',
				first_name: 'Rick',
				last_name: 'Chengwitz',
				gender: 'male',
			}
		}
	}, {
		_id: '2',
		services: {
			facebook: {
				id: '2',
				email: 'email@email.com',
				name: 'First Last',
				first_name: 'First',
				last_name: 'Last',
				gender: 'female',
			}
		}
	}];

	Tinytest.add("Users - Insert test users", function(test) {
		_.each(testUsers, function(testUser) {
			var id = testUser._id;
			if (!Users.findOne(id)) {
				Users.insert(testUser);
				test.isTrue(Users.findOne(id) instanceof Object, "Expected the test user to be created");
			}
		});
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

	// TODO check if this is correct
	if (!Meteor.isLoggedIn()) {
		Tinytest.addAsync("Users - Login with Facebook", function(test, next) {
			Users.loginWithFacebook(function(err) {
				test.isUndefined(err, "Expected no error to occur: " + err);
				var user = Users.findOne(Meteor.userId());
				test.equal(user._id, Meteor.userId(), "Expected user to be found");
				next();
			});
		});
	}

	Tinytest.addAsync("Users - Login with test user", function(test, next) {
		Meteor.logout();
		testLogin(testUserId, function(err) {
			test.isUndefined(err, "Expected no error to occur: " + err);
			next();
		});
	});

	Tinytest.addAsync("Users - Subscribe to current user data", function(test, next) {
		Meteor.subscribe('currentUserData', function(err) {
			test.isUndefined(err, "Expected no error to occur: " + err);
			test.isTrue(Meteor.user().feedIds instanceof Array, "Expected the user's feeds to be published");
			next();
		});
	});

	Tinytest.addAsync("Users - Update subscribed feeds", function(test, next) {
		var newFeeds = ['wotid', 'yoo'];
		Users.updateFeeds(newFeeds, function(err, numModified) {
			test.isUndefined(err, "Expected no error to occur: " + err);
			test.equal(numModified, 1, "Expected one document to be modified");
			test.equal(Meteor.user().feedIds, newFeeds, "Expected user's feeds to be updated");
			next();
		});
	});
}
