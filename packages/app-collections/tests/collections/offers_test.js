/*if (Meteor.isClient) {
	Tinytest.addAsync("Offers - Insert - Create two identical offers", function(test, next) {
		Meteor.subscribe('posts', function(err) {
			Offers.create(Posts.findOne(), function(err, _id) {
				//test.isUndefined(err, "Expected no error to occur: " + err);
				Debug.log('yoooo', {err: err, _id: _id});
				next();
			});
		})
	});
}
*/
