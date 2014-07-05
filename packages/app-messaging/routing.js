// also add if the conversationId is invalid reroute to the first conversation
MessagingController = FastRender.RouteController.extend({
	template: 'messaging',
	waitOn: function() {
		if (Meteor.isClient && !Meteor.isLoggedIn()) {
			Router.go('/');
		}
		// if route has a conversationId
		return [
			Meteor.subscribe('conversations', {
				_id: {$in: Meteor.user().conversationIds}
			}),
			Meteor.subscribe('users', this.userId, {
				fields: {
					profile: true,
					conversationIds: true
				}
			}),
			Meteor.subscribe('messages', {
				conversationId: {$in: Meteor.user().conversationIds}
			})
		];
	},
	data: function() {
		if (!this.params.conversationId) {
			var conv = Conversations.findOne({_id: {$in: Meteor.user().conversationIds}});
			Debug.messaging('No conversationId: route is /messages, conv found', conv);
			if (conv) {
				window.history.replaceState({conversationId: conv._id}, '', '/messages/' + conv._id);
				this.params.conversationId = conv._id;
			}
		}
		Debug.messaging('Routing data', {conversationId: this.params.conversationId});
		if (this.params.conversationId) {
			var conversation, conversations, messages;
			var transform = function(doc) {
				if (doc.users.length > 2) {
					doc.otherUsers = [];
				}
				_.each(doc.users, function(user) {
					if (Meteor.userId() === user._id) {
						doc.name = user.conversationName;
					} else if (doc.users.length === 2) {
						doc.otherUser = Meteor.users.findOne(user._id);
					} else if (doc.users.length > 2) {
						doc.otherUsers.push(Meteor.users.findOne(user._id));
					}
				});
				return doc;
			};

			conversation = Conversations.findOne(this.params.conversationId, {transform: transform});
			messages = Messages.find({
				conversationId: this.params.conversationId
			}, {
				sort: {createdAt: 1},
				transform: function(doc) {
					doc.sender = Meteor.users.findOne(doc.senderId);
					return doc;
				}
			}).fetch();
			if (Meteor.user().conversationIds.length > 0) {
				conversations = Conversations.find({_id: {$in: Meteor.user().conversationIds}}, {transform: transform}).fetch();
			}

			return {
				conversation: conversation,
				conversations: conversations,
				messages: messages,
				conversationId: this.params.conversationId
			};
		}
	}
});

Router.map(function() {
	this.route('messages', {
		path: '/messages/:conversationId?',
		controller: MessagingController
	});
});
