Template.header.events({
    'click #login': function() {
	Meteor.loginWithFacebook(function(e) {
	    if(e) {console.log(e); alert(e)}
	    else {
		console.log("You have logged in!");
	    }
	})
    }
});
