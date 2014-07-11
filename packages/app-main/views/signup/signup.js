Template.pageSignup.helpers({
    'ref': function() {
        if(this)
            return Meteor.users.findOne({_id: this.refId});
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

Template.pageReferralCenter.helpers({
    'refCount': function() {
        if(Meteor.user().profile.referrals)
            return Meteor.user().profile.referrals.length;
        else
            return 0;
    },
    'referrals': function() {
        if(Meteor.user().profile.referrals)
            return Meteor.users.find({_id: {$in: Meteor.user().profile.referrals}});
        else 
            return null;
    },
    'refUrl': function() {
        return window.location.protocol + '//' + window.location.host + "/signup?ref=" + Meteor.userId();
    }
});

Template.pageReferralCenter.rendered = function() {
    $('input[name=referral_link]').click(function() {
        this.select();
    });
}
