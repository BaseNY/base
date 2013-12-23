Template.header.events({
    'click #login': function() {
	Meteor.loginWithFacebook({
	    requestPermissions:
	    ['email',
	    'user_about_me',
	    'user_birthday',
	    'user_location']
	},function(e) {
	    if(e) {console.log(e); alert(e)}
	    else {
		console.log("You have logged in!");
	    }
	})
    }
});

Template.header.helpers({
    'name': function() {
	return Meteor.user().services.facebook.first_name;
    }
});
