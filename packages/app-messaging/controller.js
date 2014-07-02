MessagingController = FastRender.RouteController.extend({
	template: 'messaging',
	waitOn: function() {
		return [
			Meteor.subscribe('conversations', {
				_id: {$in: Meteor.user().conversations}
			}),
			Meteor.subscribe('messages', {
				conversationId: {$in: Meteor.user().conversations}
			})
		];
	},
	data: function() {
		var conversations = Conversations.find({_id: {$in: Meteor.user().conversations}});
		var messages = Messages.find({conversationId: {$in: Meteor.user().conversations}});
		return {
			conversations: conversations,
			messages: messages
		};
	}
});