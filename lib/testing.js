if (Meteor.isClient) {
	Testing = {
		clearMessages: function() {
			Messages.remove({});
		},
		createMessageServer: function() {
			Meteor.call('addMessage', 'Message text');
			console.logObj('createMessageServer', Messages.find().fetch());
		},
		createMessageServerCallback: function() {
			Meteor.call('addMessage', 'Message text', function(e, r) {
				console.logObj('createMessageServerCallback', r);
			});
		},
		createMessageClient: function() {
			var message = {
				posterId: Meteor.userId(),
				poster: Meteor.user().profile.name,
				text: 'Message text',
				type: Messages.TYPE_REGULAR,
				isPublic: false
			}
			console.logObj('createMessageClient', Messages.insert(message));
		},
		createConversation: function() {
			var user = Meteor.users.findOne({_id: {$ne: Meteor.userId()}});
			Conversations.create(user._id, function(err, res) {
				if (err) {
					console.log(err);
				}
			});
		},
		clearConversations: function() {
			Meteor.call('clearConversations');
		}
	};
}

Meteor.methods({
	clearConversations: function() {
		Meteor.users.update({}, {$set: {conversationIds: []}}, {multi: true});
		Conversations.remove();
	}
});
