MessagingController = FastRender.RouteController.extend({
	template: 'messaging',
	waitOn: function() {
		return [
			Meteor.subscribe('users', this.userId, {
				fields: {
					profile: true,
					conversationIds: true
				}
			}),
			Meteor.subscribe('conversations', {
				_id: {$in: Meteor.user().conversationIds}
			}),
			Meteor.subscribe('messages', {
				conversationId: {$in: Meteor.user().conversationIds}
			})
		];
	},
	data: function() {
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
		messages = Messages.find({conversationId: this.params.conversationId}).fetch();
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
});

Router.map(function() {
	this.route('messages', {
		path: '/messages',
		template: 'messaging',
		waitOn: function() {
			if (Meteor.user().conversationIds.length > 0) {
				return Meteor.subscribe('conversations', {
					_id: {$in: Meteor.user().conversationIds}
				});
			}
		},
		action: function() {
			if (this.ready()) {
				var conversation = Conversations.findOne({_id: {$in: Meteor.user().conversationIds}});
				if (conversation) {
					this.redirect('/messages/' + conversation._id);
				} else{
					this.render();
				}
			}
		}
	});
	this.route('message', {
		path: '/messages/:conversationId',
		controller: MessagingController
	});
});
