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
	updateFriends: function() {
		var graph = Meteor.require('fbgraph');
        if(Meteor.user().services.facebook.accessToken) {
          graph.setAccessToken(Meteor.user().services.facebook.accessToken);
          //Async Meteor (help from : https://gist.github.com/possibilities/3443021
          var ret;
	  var str = '/' + Meteor.user().services.facebook.id + '/friends';
          graph.get(str, Meteor.bindEnvironment(function(err,result) {
		console.log(result);
		console.log(Meteor.userId());
		ids = [];
		_.each(result.data, function(obj) {
			ids.push(obj.id);
		});
		console.log(ids);
		Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.friends': ids}});
          }, function(err){console.log("couldn't wrap callback");}));
        }
	},
	fbUpdate: function(s) {
		Meteor.users.update({_id:this._id},{$set: {"profile.blah": s}});
		console.log(s);
	},
	resetUsers: function() {
		Meteor.users.remove({});
	},
	checkFriends: function() {
		var graph = Meteor.require('fbgraph');
          	graph.setAccessToken(Meteor.user().services.facebook.accessToken);
	  	var str = '/' + Meteor.user().services.facebook.id + '/friends';
		graph.get('/' + Meteor.user().services.facebook.id, function(e,r) {
			console.log(r);
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
	//if (!Roles.userIsInRole(admin, 'admin')) {
		Roles.addUsersToRoles(admin, 'admin');
		console.log("Added " + admin.profile.name + " as admin.");
	//}
});
