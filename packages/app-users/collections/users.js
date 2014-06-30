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
	/*lastOnline: {
		type: Date
	}*/
});

Schemas.User = new SimpleSchema({
	_id: {
		type: String
	},
	profile: {
		type: Schemas.UserProfile
	},
	friends: {
		type: [String]
	},
	subscribed: {
		type: [String]
	},
	createdAt: {
		type: Date
	},
	services: {
		type: Object,
		blackbox: true
	}
});

// TODO check that this matches for existing users
Accounts.onCreateUser(function(options, user) {
	var facebook = user.services.facebook;
	if (!facebook) {
		throw new Meteor.Error(400, "Create user - no Facebook data");
	}

	user.profile = {
		email: facebook.email,
		gender: facebook.gender,
		firstName: facebook.first_name,
		lastName: facebook.last_name,
		name: facebook.name
	};
	user.profile.img = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?width=100&height=100';
	//user.lastOnline = new Date();
	user.subscribed = Feeds.defaultIds;
	user.createdAt = new Date();
	user.friends = [];

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
				user.friends.push(friend.id);
			});
			done(err, result);
		});
	});

	if (Meteor.settings.public.debug) {
		console.logObj("Created User", user);
	}

	check(user, Schemas.User);
	return user;
});