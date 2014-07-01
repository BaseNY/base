Template.pageSignup.helpers({
    'ref': function() {
        if(this.data)
            return Meteor.users.find({_id: this.data.ref});
        else
            return null;
    }
});

Template.pageSignup.rendered = function() {
    $('#fb-signup-login').click(function() {
        ref = null;
        if(Router.current().data())
            ref = Router.current().data().refId;
        console.log(ref);
	Meteor.loginWithFacebook({
		requestPermissions: ['email',
			'user_about_me',
			'user_birthday',
			'user_location',
			'user_friends'
		]
	}, function(e,r) {
		if (e) {
			console.log(e);
			alert(e)
		} else {
			console.log("You have logged in!");
                        console.log(ref);
                        if(ref && Meteor.user().new)
                            Meteor.call('addRef', ref);
			Template.modalOverlay.close();
		}
	})

    });
    console.log(this);
}
