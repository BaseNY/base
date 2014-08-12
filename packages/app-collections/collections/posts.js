Debug.order('app-collections/collections/posts.js');

Schemas.Post = new SimpleSchema({
	createdAt: Schemas.defaults.createdAt,
	title: {
		type: String,
		optional: true,
		custom: function() {
			if (!this.isSet) {
				var type = this.field('type').value;
				if (type === 'sell') {
					return 'required';
				}
			}
		}
	},
	description: {
		type: String
	},
	type: {
		type: String,
		allowedValues: ['sell', 'buy']
	},
	feedIds: {
		type: [String],
		defaultValue: []
	},
	imageUrls: {
		type: [String],
		optional: true
	},
	userId: {
		type: String,
		label: "User Id"
	},
	score: {
		type: Number,
		autoValue: function() {
			var createdAt = this.field('createdAt');
			return Schemas.autoValue.insert(this, function() {
				return createdAt.value.getTime();
			});
		}
	},
	isCompleted: {
		type: Boolean,
		defaultValue: false
	},
	completedAt: {
		type: Date,
		optional: true,
		autoValue: function() {
			var isCompleted = this.field('isCompleted');
			if (isCompleted.isSet) {
				if (isCompleted.value) {
					return new Date;
				} else {
					return null;
				}
			}
		}
	}
});

Posts = new Meteor.Collection('posts');

Posts.attachSchema(Schemas.Post);

Posts.allowAll(function(userId, doc) {
	return userId && (userId === doc.sellerId || Roles.userIsInRole(userId, 'admin'));
});

Posts.before.update(function(userId, doc, fieldNames, modifier, options) {
	if (_.contains(fieldNames, 'isCompleted')) {
		// if isCompleted was previously true and it is still set as true
		// then set completedAt back to the original value
		if (doc.isCompleted && modifier.$set.isCompleted) {
			modifier.$set.completedAt = doc.completedAt;
		}
	}
});

Posts.helpers({
	userName: function() {
		return Users.findOne(this.userId).profile.name;
	},
	userFbId: function() {
		return Users.findOne(this.userId).profile.fbId;
	}
});

Posts.create = function(type, post, callback) {
	return Meteor.call('_createPost', type, post, callback);
};

Posts.delete = function(_id, callback) {
	return Meteor.call('_deletePost', _id, callback);
};

Meteor.methodsRequireLogin({
	_createPost: function(type, post) {
		post.userId = this.userId;
		post.type = type;
		return Posts.insert(post);
	},
	_deletePost: function(_id) {
		if (this.userId != Posts.findOne(_id).userId && !Roles.userIsInRole(this.userId, 'admin')) {
			throw new Meteor.Error(601, "Access denied: This is not your post");
		}
		return Posts.remove(_id);
	}
});
