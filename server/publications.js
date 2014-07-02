Meteor.publish('items', function(selector, options) {
	if (!selector) {
		selector = {};
	}
        if(!options) {
                options = {};
        }
	return Items.find(selector, options);
});

Meteor.publish('offers', function(selector, options) {
	if (!selector) {
		selector = {};
	}
	return Offers.find(selector);
});

Meteor.publish('feeds', function() {
	return Feeds.find();
});

Meteor.publish('userData', function() {
	return Meteor.users.find({
		_id: this.userId
	}, {
		fields: {
			'profile': 1,
			'_id': 1,
			'new_message': 1
		}
	});
});
Meteor.publish('allUserData', function() {
	return Meteor.users.find({}, {
		fields: {
			'_id': true,
			'profile': true,
			'subscribed': true,
			'createdAt': true,
			'friends': true
		}
	});
});

Meteor.publish('notifs', function() {
    return Notifications.find({
        'userId': this.userId
    },{
        'limit': 10
    });
//    return Notifications.find();
});
