if (Meteor.isClient) {
	var post;
	Tinytest.addAsync("Offers - Insert - Create offer", function(test, next) {
		Meteor.subscribe('posts', function(err) {
			post = Posts.findOne();
			Offers.create(post, function(err, _id) {
				test.isUndefined(err, "Expected no error to occur: " + err);
				next();
			});
		})
	});
}

