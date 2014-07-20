if (Meteor.isServer) {
	Meteor.methods({
		setUserAsAdmin: function(userId) {
			Roles.addUsersToRoles(userId, 'admin');
		},
		removeUserAsAdmin: function(userId) {
			Roles.setUserRoles(userId, []);
		}
	});
}

if (Meteor.isClient) {
	var testFeeds = function(type, func) {
		var lowercase = type.toLowerCase();
		Tinytest.addAsync("Feeds - " + type + " feed as regular user", function(test, next) {
			Meteor.call('removeUserAsAdmin', Meteor.userId(), function() {
				func(function(err, res) {
					test.equal(err && err.error, 403, "Expected " + lowercase  + " to fail");
					next();
				});
			});
		});
		Tinytest.addAsync("Feeds - " + type + " feed as admin", function(test, next) {
			Meteor.call('setUserAsAdmin', Meteor.userId(), function() {
				func(function(err, res) {
					test.isUndefined(err, "Expected " + lowercase  + " to succeed");
					next();
				});
			});
		});
	};

	var testFeed = {
		name: 'Test Feed All Day Every Day',
		icon: 'cashmoney'
	};

	testFeeds('Insert', function(callback) {
		Feeds.insert(testFeed, callback);
	});

	var feedId;

	Tinytest.addAsync("Feeds - Subscribe to feeds", function(test, next) {
		Meteor.subscribe('feeds', function(err) {
			test.isUndefined(err, "Expected subscription to succeed");
			feedId = Feeds.findOne(testFeed)._id;
			next();
		});
	});

	testFeeds('Update', function(callback) {
		testFeed.name = 'updated name';
		Feeds.update(feedId, {$set: testFeed}, callback);
	});

	testFeeds('Remove', function(callback) {
		Feeds.remove(feedId, callback);
	});
}
