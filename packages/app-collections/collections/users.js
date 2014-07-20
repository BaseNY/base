Debug.order('app-collections/collections/users.js');

/**
 * A function for generating an autoValue function for Facebook
 * @param  {[type]}		field	The field to get from services.facebook or
*	                         	a function that returns the value in the form:
*                              	function(services) {
*                              	}
 * @return {function}			The autoValue function
 */
var autoValueFacebook = function(arg) {
	return function() {
		if (this.isInsert || this.isUpsert) {
			var services = this.field('services').value;
			var value;
			if (_.isFunction(arg)) {
				var func = arg;
				value = func(services);
			} else {
				var fieldName = arg;
				value = services.facebook[fieldName];
			}

			return Schemas.autoValue.insert(this, value);
		}
	};
};

// TODO check middle name
Schemas.UserProfile = new SimpleSchema({
	email: {
		type: String,
		autoValue: autoValueFacebook('email')
	},
	gender: {
		type: String,
		autoValue: autoValueFacebook('gender')
	},
	firstName: {
		type: String,
		autoValue: autoValueFacebook('first_name')
	},
	lastName: {
		type: String,
		autoValue: autoValueFacebook('last_name')
	},
	name: {
		type: String,
		autoValue: autoValueFacebook('name')
	},
	img: {
		type: String,
		autoValue: autoValueFacebook(function(services) {
			return 'http://graph.facebook.com/' + services.facebook.id + '/picture?width=100&height=100';
		})
	},
	fbId: {
		type: String,
		autoValue: autoValueFacebook('id')
	}
});

Schemas.User = new SimpleSchema({
	_id: Schemas.defaults._id,
	createdAt: Schemas.defaults.createdAt,
	profile: {
		type: Schemas.UserProfile
	},
	friendIds: {
		type: [String],
		autoValue: autoValueFacebook(function(services) {
			return FBGraph.getFriends(services.facebook.id, {
				limit: 10000,
				access_token: services.facebook.accessToken
			});
		})
	},
	subscribed: {
		type: [String],
		autoValue: function() {
			return Schemas.autoValue.insert(this, Feeds.defaultIds);
		}
	},
	conversationIds: {
		type: [String],
		autoValue: function() {
			return Schemas.autoValue.insert(this, []);
		}
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
		type: Number,
		autoValue: function() {
			return Schemas.autoValue.insert(this, 2);
		}
	},
	roles: {
		type: [String],
		optional: true
	}
});

Users = Meteor.users;

Users.attachSchema(Schemas.User);

var allowedFieldNames = ['subscribed'];
Users.allow({
	update: function(userId, doc, fieldNames, modifier) {
		return doc._id === userId && _.difference(fieldNames, allowedFieldNames).length === 0;
	}
});

/*
Users.helpers({
	image: function() {
		return this.profile.img;
	}
});*/

if (Meteor.isClient) {
	var loginWithFacebookOptions = {
		requestPermissions: [
			'email',
			'user_about_me',
			'user_birthday',
			'user_location',
			'user_friends'
		]
	};

	Users.loginWithFacebook = function(callback) {
		Meteor.loginWithFacebook(loginWithFacebookOptions, callback);
	};
}

Users.updateFeeds = function(feedIds, callback) {
	Users.update(Meteor.userId(), {
		$set: {
			subscribed: feedIds
		}
	}, callback);
}

Users.after.insert(function(userId, doc) {
	Debug.users('Sending welcome email to: ', doc);

	if (Meteor.isServer) {
		Email.sendWelcomeEmail(doc);
	}
});

if (Meteor.isServer) {
	Accounts.onCreateUser(function(options, user) {
		var facebook = user.services.facebook;
		if (!facebook) {
			throw new Meteor.Error(400, "Create user - no Facebook data");
		}
		//Debug.users('Accounts.onCreateUser', {user: user, options: options});
		return user;
	});

	Accounts.onLogin(function(attempt) {
		var user = attempt.user;
		//Debug.users('Accounts.onLogin', {user: user});
		if (user && user.new) {
			Meteor.users.update(user._id, {$inc: {new: -1}});
		}
	});
}

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
	}
});
