Debug.order('app-collections/publications.js');

Meteor.publish('users', Utils.defaultPublishFunction(Meteor.users));

/**
 * Publishes data for the logged in user.
 */
Meteor.publish('userData', function() {
	return Meteor.users.find(this.userId, {
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


Meteor.publish('feeds', Utils.defaultPublishFunction(Feeds));

Meteor.publish('notifs', function() {
	return Notifications.find({
		'userId': this.userId
	}, {
		'limit': 10
	});
});

Meteor.publish('items', Utils.defaultPublishFunction(Items));

Meteor.publish('offers', Utils.defaultPublishFunction(Offers));
