Debug.order('app-collections/collections/users.js');

// TODO check middle name
Schemas.UserProfile = new SimpleSchema({
	email: {
		type: String
	},
	gender: {
		type: String
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	name: {
		type: String
	},
	img: {
		type: String
	},
	fbId: {
		type: String
	}
});

Schemas.User = new SimpleSchema({
	_id: {
		type: String
	},
	profile: {
		type: Schemas.UserProfile
	},
	friendIds: {
		type: [String]
	},
	subscribed: {
		type: [String]
	},
	conversationIds: {
		type: [String]
	},
	createdAt: {
		type: Date
	},
	lastOnline: {
		type: Date,
		optional: true
	},
	services: {
		type: Object,
		blackbox: true
	},
	new: {
		type: Number
	}
});

//Meteor.users.attachSchema(Schemas.User);

// TODO check that this matches for existing users
Accounts.onCreateUser(function(options, user) {
	var facebook = user.services.facebook;
	if (!facebook) {
		throw new Meteor.Error(400, "Create user - no Facebook data");
	}

	Debug.users('Accounts.onCreateUse', {user: user, options: options});

	user.profile = {
		email: facebook.email,
		gender: facebook.gender,
		firstName: facebook.first_name,
		lastName: facebook.last_name,
		name: facebook.name,
		fbId: user.services.facebook.id // TODO see if this is needed
	};
	user.profile.img = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?width=100&height=100';
	user.lastOnline = null; //new Date();
	user.subscribed = Feeds.defaultIds;
	user.createdAt = new Date();
	user.friendIds = [];
	user.conversationIds = [];
        user.verified = false;
	user.new = 2;

	// getting friends
	// only adds the friends that have also authorized this app
	// TODO check if its necessary to add code for the pagination
	var fbParams = {
		limit: 10000,
		access_token: user.services.facebook.accessToken
	};
	user.friendIds = FBGraph.getFriends(user.services.facebook.id, fbParams);

	Debug.users("Created User", user);

    Email.sendWelcomeEmail(user);

	return user;
});

Accounts.onLogin(function(attempt) {
	var user = attempt.user;
	if (user && user.new) {
		Meteor.users.update(user._id, {$inc: {new: -1}});
		console.log(user.new);
	}
});

Meteor.methods({
	'_updateUserFeeds': function(feedIds) {
		return Meteor.users.update(this.userId, {$set: {subscribed: feedIds}});
	},
    '_fbgraph': function(activity,params) {
        console.log(Meteor.user());
        FBGraph.post(activity,params,function(e,r) {
            if(e)
                console.log(e);
        });
    },
    'sendVerificationEmail': function(id) {
        if(!id)
            id = Meteor.userId();
        Accounts.sendVerificationEmail(id);
    }
});

Accounts.verifyEmail(Accounts._verifyEmailToken,function(e) {
    if(e != null) {
        //error action
    }else{ 
        /*
         * how do i get the user back???
        Email.sendWelcomeEmail
        */
    }
}
