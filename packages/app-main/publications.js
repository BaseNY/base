Meteor.publish('feeds', Utils.defaultPublishFunction(Feeds));

Meteor.publish('notifs', function() {
	return Notifications.find({
		'userId': this.userId
	}, {
		'limit': 10
	});
});
