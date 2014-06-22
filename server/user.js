Meteor.startup(function () {
    Accounts.loginServiceConfiguration.remove({
	service: "facebook"
    });
    Accounts.loginServiceConfiguration.insert({


	service: "facebook",
	//appId: "199242350261474",

      //  appId: "581722495207267",
        //appId:"1382563015306531",
        //base2
        appId:"655164321229763",
	//secret:"dcd13b60204fb657a47ca97da9e8daca"
        //secret:"c756e217e627b5699e96bfef0cfebede"
        //secret:"b4adbd910499149cb712ae6e948c2e73"
        //base2
        secret: "8f0efa53e0417109a6d9f28226df89c0"
    });
}); 

Accounts.onCreateUser(function(options, user) {
    //this part isn't working at all..find out why
    console.log(user);
    if(user.services.facebook) {
	//something's odd about this -- not getting user_birthdays for some reason through facebook api
	temp = user.services.facebook;
	options.profile.email = temp.email;
	options.profile.gender = temp.gender;
	options.profile.first_name = temp.first_name;
	options.profile.last_name = temp.last_name;
        options.profile.last_online = "soemthing";
        options.profile.subscribed = defaultFeedIds;
        console.log(defaultFeeds);
//	options.profile.name = user.profile.name;
//        console.log(user.profile.find());
	user.profile = options.profile;
        user.profile.img = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?width=100&height=100';
        user.profile.fbId = user.services.facebook.id;
}

    var graph = Meteor.require('fbgraph');
    if(user.services.facebook.accessToken) {
        graph.setAccessToken(user.services.facebook.accessToken);
        //Async Meteor (help from : https://gist.github.com/possibilities/3443021
	console.log(user._id);
          graph.get('/' + user.services.facebook.id + '/friends', Meteor.bindEnvironment(function(err,result) {
		console.log(result);
		console.log(Meteor.userId());
		var ids = [];
		_.each(result.data, function(obj) {
			ids.push(obj.id);
		});
		Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.friends': ids}});
          }, function(err){console.log("couldn't wrap callback");}));
    }

    return user;

});
