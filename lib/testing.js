if (Meteor.isClient) {
	Testing = {
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
		Messages.remove();
	}
});
