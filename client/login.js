var tempFBLogCode = function() {
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

Template.header.events({
    'click #user-wrapper': function() {
	//if not logged in 
	//open the modal screen
	//login, signup, login with fb
	//else
	//automatcially go to the profile page
	$('#modal-container').css('display','block');

    }
});

Template.modalOverlay.events({
    'click': function() {
	$('#modal-container').css('display','none');
    }
});

Template.header.rendered = function() {
    /*
    $('#user-wrapper').hover(showDrop($('#logDrop')), hideDrop($('#hideDrop')));
    */
    $('#user-wrapper').hover(function() {
	$('#logDrop').toggleClass('dropdown');
    },
    function() {
	$('#logDrop').toggleClass('dropdown');
    });
}

Template.header.helpers({
    'name': function() {
	return Meteor.user().services.facebook.first_name;
    }
});
