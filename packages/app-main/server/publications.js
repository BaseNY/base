Meteor.publish('feeds', function() {
	return Feeds.find();
});

Meteor.publish('notifs', function() {
	return Notifications.find({
		'userId': this.userId
	}, {
		'limit': 10
	});
});
