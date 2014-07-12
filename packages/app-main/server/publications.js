Meteor.publish('feeds', function() {
	return Feeds.find();
});

// get data for the logged in user
Meteor.publish('userData', function() {
	return Meteor.users.find({
		_id: this.userId
	}, {
		fields: {
			'_id': true,
			'profile': true,
			'createdAt': true,
			'conversationIds': true,
			'friendIds': true,
			'subscribed': true,
			'new_message': true,
			'new': true,
			'roles': true
		}
	});
});

// TODO change this so that only users that are needed are subscribed to
Meteor.publish('allUserData', function() {
	return Meteor.users.find({}, {
		fields: {
			'_id': true,
			'profile': true,
			'createdAt': true,
			'friends': true,
			'conversationIds': true
		}
	});
});

Meteor.publish('notifs', function() {
	return Notifications.find({
		'userId': this.userId
	}, {
		'limit': 10
	});
});
