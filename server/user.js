Meteor.startup(function () {
    Accounts.loginServiceConfiguration.remove({
	service: "facebook"
    });
    Accounts.loginServiceConfiguration.insert({


	service: "facebook",
	appId: "581722495207267",
	//         appId:"1382563015306531",
	secret:"c756e217e627b5699e96bfef0cfebede"
	//           secret: "559eaba1052b2bf3e289d5111d1af729"
    });
}); 

Accounts.onCreateUser(function(options, user) {
    if(user.services.facebook) {
	//something's odd about this -- not getting user_birthdays for some reason through facebook api
	temp = user.services.facebook;
	options.profile.email = temp.email;
	options.profile.gender = temp.gender;
	options.profile.first_name = temp.first_name;
	options.profile.last_name = temp.last_name;
	options.profile.name = user.profile.name;
	user.profile = options.profile;
    }

    return user;

});
