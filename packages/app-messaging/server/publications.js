Meteor.publish('conversations', Utils.generatePublishFunction(Conversations));
Meteor.publish('messages', Utils.generatePublishFunction(Messages));
