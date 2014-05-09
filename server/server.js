Meteor.methods({
	updateLast: function() {
		var temp = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile;
		temp.last_online = new Date();
		Meteor.users.update({
			_id: Meteor.userId()
		}, {
			profile: temp
		});
	}
});
