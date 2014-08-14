if (Meteor.isServer) {
	Meteor.methods({
		clearOffers: function() {
			Offers.remove({});
		}
	});
}

if (Meteor.isClient) {
	Deps.autorun(function() {
		Meteor.subscribe('posts');
	});

	var post;
	var createdOfferId;
	Tinytest.addAsync("Offers - Insert - Create offer", function(test, next) {
		Meteor.call('clearOffers', function(err, res) {
			post = Posts.findOne();
			Offers.create(post, function(err, _id) {
				test.isUndefined(err, "Expected no error to occur: " + err);
				createdOfferId = _id;
				next();
			});
		});
	});

	Tinytest.addAsync("Offers - Insert - Create offer that is identical to the previous", function(test, next) {
		Offers.create(post, function(err, _id) {
			test.isTrue(err instanceof Error, "Expected error to occur because you shouldn't be able to create two offers with the same post and buyer: " + err);
			next();
		});
	});

	Tinytest.addAsync("Offers - Remove - Remove offer", function(test, next) {
		Offers.remove(createdOfferId, function(err) {
			test.isUndefined(err, "Expected no error to occur: " + err);
			next();
		});
	});
}
