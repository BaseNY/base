Debug.order('app-collections/collections/users.js');

/**
 * A function for generating an autoValue function for Facebook
 * @param  {[type]}		field	The field to get from services.facebook or
 *	                         	a function that returns the value in the form:
 *                              function(services) {
 *                              }
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
var Profile = new SimpleSchema({
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
			return 'http://graph.facebook.com/' + services.facebook.id + '/';
		})
	},
	fbId: {
		type: String,
		autoValue: autoValueFacebook('id')
	}
});

/**
 * Marks whether each part of the signup is done.
 */
var SignupProgression = new SimpleSchema({
	zipcode: {
		type: Boolean,
		defaultValue: false
	},
	feeds: {
		type: Boolean,
		defaultValue: false
	}
});

Schemas.User = new SimpleSchema({
	_id: Schemas.defaults._id,
	createdAt: Schemas.defaults.createdAt,
	lastOnlineAt: {
		type: Date,
		autoValue: function() {
			return Schemas.autoValue.insert(this, new Date);
		}
	},
	profile: {
		type: Profile
	},
	services: {
		type: Object,
		blackbox: true
	},
	friendIds: {
		type: [String],
		autoValue: autoValueFacebook(function(services) {
			return FBGraph.getFriends(services.facebook.id, {
				access_token: services.facebook.accessToken
			});
		})
	},
	feedIds: { // TODO set feedIds at account creation modal
		type: [String],
		autoValue: function() {
			return Schemas.autoValue.insert(this, Feeds.defaultIds);
		}
	},
	conversationIds: {
		type: [String],
		defaultValue: []
	},
	signupProgression: {
		type: SignupProgression
	},
	roles: {
		type: [String],
		optional: true
	}
});

Users = Meteor.users;

Users.attachSchema(Schemas.User);

var allowedFieldNames = ['feedIds'];
Users.allow({
	insert: Collections.allow.admin,
	// TODO move this to a Meteor.method
	update: function(userId, doc, fieldNames, modifier) {
		return doc._id === userId && _.difference(fieldNames, allowedFieldNames).length === 0;
	},
	remove: Collections.allow.admin
});

Users.helpers({
	image: function(size) {
		return this.profile.img + '/picture?width=' + size + '&height=' + size;
	}
});

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
			feedIds: feedIds
		}
	}, callback);
};

Users.after.insert(function(userId, doc) {
	if (Meteor.isServer) {
		Debug.collections('Users - Sending welcome email', doc.profile.name);
		//Email.sendWelcomeEmail(doc); TODO
	}
});

if (Meteor.isServer) {
	Accounts.onCreateUser(function(options, user) {
		var facebook = user.services.facebook;
		if (!facebook) {
			throw new Meteor.Error(610, "Create user - no Facebook data");
		}
		Debug.collections('Users - Accounts.onCreateUser', {
			user: user,
			options: options
		});
		return user;
	});
}
