if (Meteor.isClient) {
	Meteor._suppress_log(1);
	Tinytest.addAsync("Conversations - _createConversation with less than 2 users", function(test, next) {
		Conversations.create([], function(err, res) {
			test.isTrue(err instanceof Error, "Expected error to occur because users shouldn't be allowed to create a conversation with less than 2 users: " + err);
			next();
		});
	});
}
