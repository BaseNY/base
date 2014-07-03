Tinytest.add('App Messaging - Conversations Test', function(test) {
	var conv = Conversations.insert({});
	test.equal(Conversations.find().count(), 1, 'Expected 1 conversation to be added');
});