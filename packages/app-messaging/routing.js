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
			}),
			Meteor.subscribe('offers', {
				$or: [{sellerId: this.userId}, {buyerId: this.userId}]
			}),
			Meteor.subscribe('items', {})
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
			var conversation, conversations, messages, offer;
			var transformConv = function(doc) {
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

			conversation = Conversations.findOne(this.params.conversationId, {transform: transformConv});
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
				conversations = Conversations.find({
					_id: {$in: Meteor.user().conversationIds}
				}, {
					transform: function(doc) {
						if (doc._id === conversation._id) {
							doc.current = true;
						}
						return transformConv(doc);
					}
				}).fetch();
			}

			if (conversation.offerId) {
				offer = Offers.findOne(conversation.offerId, {
					transform: function(doc) {
						doc.item = Items.findOne(doc.itemId);
						return doc;
					}
				});
				Debug.messaging('Conversation has offerId', offer);
			}

			return {
				conversationId: this.params.conversationId,
				conversation: conversation,
				conversations: conversations,
				messages: messages,
				offer: offer
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
