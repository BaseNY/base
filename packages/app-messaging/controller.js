MessagingController = FastRender.RouteController.extend({
	template: 'messaging',
	waitOn: function() {
		if (Meteor.user().conversationIds.length > 0) {
			return [
				Meteor.subscribe('conversations', {
					_id: {$in: Meteor.user().conversationIds}
				}),
				Meteor.subscribe('messages', {
					conversationId: {$in: Meteor.user().conversationIds}
				})
			];
		}
	},
	data: function() {
		var conversations, messages;
		if (Meteor.user().conversationIds.length > 0) {
			conversations = Conversations.find(
				{
					_id: {$in: Meteor.user().conversationIds}
				},
				{
					transform: function(doc) {
						_.each(doc.users, function(user) {
							if (Meteor.userId() === user._id) {
								doc.name = user.conversationName;
							} else if (!doc.otherUser) {
								doc.otherUser = Meteor.users.findOne(user._id);
							}
						});
						return doc;
					}
				}
			).fetch();
			messages = Messages.find({conversationId: {$in: Meteor.user().conversationIds}}).fetch();
		}
		return {
			conversations: conversations,
			messages: messages,
			conversationId: this.params.conversationId
		};
	}
});
