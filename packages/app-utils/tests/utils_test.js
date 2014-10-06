if (Meteor.isClient) {
	Tinytest.add("Utils - Meteor.isLoggedIn", function(test, next) {
		test.equal(Meteor.isLoggedIn(), false);
	});
}
