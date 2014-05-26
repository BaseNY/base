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


// Setting admin roles
var admins = Meteor.users.find({
	'services.facebook.id': {
		$in: ['100000326610254', '1166676736', '1820411408'] // Steve, Keshara, Jasper
	}
}).fetch();
_.each(admins, function(admin) {
	if (!Roles.userIsInRole(admin, 'admin')) {
		Roles.addUsersToRoles(admin, 'admin');
		console.log("Added " + admin.profile.name + " as admin.");
	}
});
