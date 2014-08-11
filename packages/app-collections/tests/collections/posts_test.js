if (Meteor.isClient) {
	// ========================== INSERT TESTS ==========================

	Tinytest.addAsync("Posts - Insert - Sell post with title", function(test, next) {
		Meteor.subscribe('feeds', function(err) {
			Posts.create('sell', {
				title: 'iPhone 9',
				description: 'So apple much cool',
				feeds: [Feeds.findOne()._id]
			}, function(err) {
				test.isUndefined(err, "Expected no error to occur because title is present: " + err);
				next();
			});
		});
	});

	Tinytest.addAsync("Posts - Insert - Sell post without title", function(test, next) {
		Meteor.subscribe('feeds', function(err) {
			Posts.create('sell', {
				description: 'So apple much cool',
				feeds: [Feeds.findOne()._id]
			}, function(err) {
				test.isTrue(err instanceof Error, "Expected error to occur because title isn't present and title is required for a sell post: " + err);
				next();
			});
		});
	});

	Tinytest.addAsync("Posts - Insert - Buy post with title", function(test, next) {
		Meteor.subscribe('feeds', function(err) {
			Posts.create('buy', {
				title: 'iPhone 9',
				description: 'Buying iPhone 9',
				feeds: [Feeds.findOne()._id]
			}, function(err) {
				test.isUndefined(err, "Expected no error to occur: " + err);
				next();
			});
		});
	});

	Tinytest.addAsync("Posts - Insert - Buy post without title", function(test, next) {
		Meteor.subscribe('feeds', function(err) {
			Posts.create('buy', {
				description: 'Buying iPhone 9',
				feeds: [Feeds.findOne()._id]
			}, function(err) {
				test.isUndefined(err, "Expected no error to occur: " + err);
				next();
			});
		});
	});

	Tinytest.addAsync("Posts - Insert - Post without feeds", function(test, next) {
		Meteor.subscribe('feeds', function(err) {
			Posts.create('buy', {
				description: 'Buying iPhone 9'
			}, function(err) {
				test.isUndefined(err, "Expected no error to occur: " + err);
				next();
			});
		});
	});

	Tinytest.addAsync("Posts - Insert - Post with invalid type", function(test, next) {
		Meteor.subscribe('feeds', function(err) {
			Posts.create('wooot', {
				description: 'Buying iPhone 9',
				feeds: [Feeds.findOne()._id]
			}, function(err) {
				test.isTrue(err instanceof Error, "Expected error to occur because the type is invalid");
				next();
			});
		});
	});

	// ========================== UPDATE TESTS ==========================

	var postId;
	Tinytest.addAsync("Posts - Subscribe to posts", function(test, next) {
		Meteor.subscribe('posts', function(err) {
			test.isUndefined(err, "Expected subscription to succeed");
			postId = Posts.findOne()._id;
			next();
		});
	});

	var testUpdate = function(test, err, numModified) {
		test.isUndefined(err, "Expected no error to occur: " + err);
		test.equal(numModified, 1, "Expected one post to be modified");
	};

	Tinytest.addAsync("Posts - Update - Post", function(test, next) {
		Posts.update(postId, {
			$set: {title: 'new title'}
		}, function(err, numModified) {
			testUpdate(test, err, numModified);
			next();
		});
	});

	Tinytest.addAsync("Posts - Update - Post with completed false", function(test, next) {
		Posts.update(postId, {
			$set: {isCompleted: false}
		}, function(err, numModified) {
			testUpdate(test, err, numModified);
			var post = Posts.findOne(postId);
			test.isNull(post.completedAt, "Expected completedAt to be null");
			next();
		});
	});

	testAsyncMulti("Posts - Update - Post with completed true", [
		function(test, expect) {
			Posts.update(postId, {
				$set: {isCompleted: true}
			}, expect(function(err, numModified) {
				testUpdate(test, err, numModified);
				var post = Posts.findOne(postId);
				test.isTrue(post.completedAt instanceof Date, "Expected completedAt to be a date");
			}));
		},
		function(test, expect) {
			var previousCompletedAt = Posts.findOne(postId).completedAt;
			Posts.update(postId, {
				$set: {isCompleted: true}
			}, expect(function(err, numModified) {
				testUpdate(test, err, numModified);
				var post = Posts.findOne(postId);
				test.equal(previousCompletedAt, post.completedAt, "Expected completedAt to stay the same if isCompleted is set to true two times in a row");
			}));
		}
	]);
}
