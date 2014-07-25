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

Meteor.smartPublish('smartNotifs', function() {
	this.addDependency('notifs', 'userId', function(notif) {
		return Meteor.users.find(notif.actorId);
	});
	this.addDependency('notifs', 'postId', function(notif) {
		return Items.find(notif.postId, {fields: {title: true}});
	});
	return Notifications.find({'userId': this.userId}, {limit: 10});
});

Meteor.publish('items', Utils.defaultPublishFunction(Items));

Meteor.smartPublish('smartPosts', function(filter, limit, lastScore) {
	this.addDependency('items', 'sellerId', function(post) {
		return Meteor.users.find(post.sellerId);
	});
	this.addDependency('items', '_id', function(post){
		return Comments.find({postId: post._id});
	});
	if (!filter) {
		filter = {}
	} else if (lastScore) {
		_.extend(filter, {
			score: {$lt: lastScore}
		});
	}
	var items = Items.find(filter, {sort: {score: -1}, limit: 10});
	Debug.log('lastscore', lastScore);
	Debug.log('free items broski', items.fetch());
	return items;
});

Meteor.publish('offers', Utils.defaultPublishFunction(Offers));

Meteor.publish('comments', Utils.defaultPublishFunction(Comments));

Meteor.publish('conversations', Utils.defaultPublishFunction(Conversations));

Meteor.smartPublish('smartConversations', function(filter) {
	this.addDependency('conversations', 'users', function(conversation) {
		var userIds = _.pluck(conversation.users, '_id');
		return Meteor.users.find({_id: {$in: userIds}});
	});
	if (!filter) {
		filter = {}
	}
	return Conversations.find(filter);
});

Meteor.publish('messages', Utils.defaultPublishFunction(Messages));
