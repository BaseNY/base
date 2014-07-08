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

// TODO check that this matches for existing users
Accounts.onCreateUser(function(options, user) {
	var facebook = user.services.facebook;
	if (!facebook) {
		throw new Meteor.Error(400, "Create user - no Facebook data");
	}

	Debug.users('user', user);
	Debug.users('options', options);

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
	console.log(Feeds.defaultIds);
	user.subscribed = Feeds.defaultIds;
	console.log(user.subscribed);
	user.createdAt = new Date();
	user.friendIds = [];
	user.conversationIds = [];

	user.new = 2;

	// getting friends
	// only adds the friends that have also authorized this app
	FBGraph.setAccessToken(user.services.facebook.accessToken);
	// TODO check if its necessary to add code for the pagination
	var fbparams = {
		limit: 10000
	};
	Async.runSync(function(done) {
		FBGraph.get('/' + user.services.facebook.id + '/friends', fbparams, function(err, result) {
			_.each(result.data, function(friend) {
				user.friendIds.push(friend.id);
			});
			done(err, result);
		});
	});

	Debug.users("Created User", user);

    console.log(user);
    sendWelcomeEmail(user);
	//check(user, Schemas.User);
	return user;
});

Accounts.onLogin(function(attempt) {
	var user = attempt.user;
	if (user && user.new) {
		Meteor.users.update(user._id, {$inc: {new: -1}});
		console.log(user.new);
	}
});
