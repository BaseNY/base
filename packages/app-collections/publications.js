Debug.order('app-collections/publications.js');

/**
 * Publishes data for the logged in user.
 */
Meteor.publish('currentUserData', function() {
    return Users.find(this.userId, {
        fields: {
            _id: true,
            createdAt: true,
            profile: true,
            friendIds: true,
            feedIds: true,
            conversationIds: true,
            signupProgression: true,
            roles: true
        }
    });
});

Meteor.publish('feeds', Utils.defaultPublishFunction(Feeds));

Meteor.publish('posts', Utils.defaultPublishFunction(Posts));

Meteor.publish('conversations', function() {
	return Conversations.find({
		'users._id': this.userId
	});
});
