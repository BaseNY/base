Debug.order('app-collections/publications.js');

/**
 * Publishes data for the logged in user.
 */
Meteor.publish('currentUserData', function() {
    return Meteor.users.find(this.userId, {
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
