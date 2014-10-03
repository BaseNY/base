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

/*
   Meteor.smartPublish('smartNotifs', function() {
   this.addDependency('notifs', 'userId', function(notif) {
   return Meteor.users.find(notif.actorId);
   });
   this.addDependency('notifs', 'postId', function(notif) {
   return Items.find(notif.postId, {fields: {title: true}});
   });
   return Notifications.find({'userId': this.userId}, {limit: 10});
   });
   */

Meteor.publish('smartNotifs', function() {
	Meteor.publishWithRelations({
		handle: this,
		collection: Notifications,
		filter: {
			userId: this.userId
		},
		options: {
			limit: 10
		},
		mappings: [{
			key: 'actorId',
			collection: Meteor.users
		}, {
			key: 'postId',
			collection: Items
		}]
	});
});

Meteor.publish('items', Utils.defaultPublishFunction(Items));

/*
   Meteor.smartPublish('smartPosts', function(filter, limit, lastScore) {
   this.addDependency('items', 'sellerId', function(post) {
   return Meteor.users.find(post.sellerId);
   });
   this.addDependency('items', '_id', function(post){
   return Comments.find({postId: post._id});
   });
   this.addDependency('comments', 'userId', function(comment) {
   return Meteor.users.find(comment.userId);
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
   */

Meteor.publish('smartPosts', function(filter, limit, lastScore) {
    console.log('publishing posts');
	if (!filter) {
		filter = {}
	} else if (lastScore) {
		//will publish the next 10 if therei sa  lastscore value
		_.extend(filter, {
			score: {
				$lt: lastScore
			}
		});
		//filter.score = {$lt: lastScore};
	}

	if (!limit)
		limit = 1;

	return Meteor.publishWithRelations({
		handle: this,
		collection: Items,
		filter: filter,
		options: {
			limit: 10,
			sort: {
				score: -1
			}
		},
		mappings: [{
			key: 'sellerId',
			collection: Meteor.users
	    }, {
			//default matches key from parent to id of child.
			//reverse matches key of child to id of parent
			reverse: true,
			key: 'postId',
			collection: Comments,
			mappings: [{
				key: 'userId',
				collection: Meteor.users
			}]
	    }]
	});
});

Meteor.publish('offers', Utils.defaultPublishFunction(Offers));

Meteor.publish('comments', Utils.defaultPublishFunction(Comments));

//Meteor.publish('conversations', Utils.defaultPublishFunction(Conversations));

/*
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
   */

Meteor.publish('smartConversations', function(filter) {
	if (!filter) {
		filter = {}
	}

	_.extend(filter, {
		_id: {
			$in: Meteor.users.findOne({
				_id: this.userId
			}).conversationIds
		}
	});
	Meteor.publishWithRelations({
		handle: this,
		collection: Conversations,
		filter: filter,
		mappings: [{
			key: 'users',
			collection: Meteor.users
		}, {
			key: 'offerId',
			collection: Offers,
			mappings: [{
				key: 'itemId',
				collection: Items
		}]
		}, {
			reverse: true,
			key: 'conversationId',
			collection: Messages,
			mappings: [{
				key: 'senderId',
				collection: Meteor.users
			}]
		}]
	});
});

Meteor.publish('conversations', function(filter) {
	if (!filter) {
		filter = {}
	}

	_.extend(filter, {
		_id: {
			$in: Meteor.users.findOne({
				_id: this.userId
			}).conversationIds
		}
	});
	return Conversations.find(filter);
});

Meteor.publish('messages', Utils.defaultPublishFunction(Messages));
