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
	},
	tempFB: function() {
		var graph = Meteor.require('fbgraph');
        if(Meteor.user().services.facebook.accessToken) {
          graph.setAccessToken(Meteor.user().services.facebook.accessToken);
          //Async Meteor (help from : https://gist.github.com/possibilities/3443021
          var ret;
          graph.get('/me/friends', function(err,result) {
              ret = result;
          });
          return ret;
        }
	},
	fbUpdate: function(s) {
		Meteor.users.update({_id:this._id},{$set: {"profile.blah": s}});
		console.log(s);
	}
});


// Setting admin roles
var admins = Meteor.users.find({
	'services.facebook.id': {
		$in: ['100000326610254', '1166676736', '1820411408'] // Steve, Keshara, Jasper
	}
}).fetch();
_.each(admins, function(admin) {
	//if (!Roles.userIsInRole(admin, 'admin')) {
		Roles.addUsersToRoles(admin, 'admin');
		console.log("Added " + admin.profile.name + " as admin.");
	//}
});
