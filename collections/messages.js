/* Message
{
	time:
	posterId:
	poster:
	offerId:
	text:
	type: - 1 is an offer, 0 is a regular message -
	isPublic:
}
*/
Messages = new Meteor.Collection('messages');

Meteor.methods({
	createMessage: function(data) {
		var message = {
			time: new Date(),
			posterId: Meteor.userId(),
			poster: Meteor.user().profile.name,
			offerId: data.offerId,
			text: data.text,
			type: 1,
			isPublic: false
		};
		return Messages.insert(message);
	},
	clearMessages: function() {
		return Meteor.users.update({
			_id: Meteor.userId()
		}, {
			$set: {
				new_message: 0
			}
		});
	},
})
