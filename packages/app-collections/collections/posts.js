Debug.order('app-collections/collections/items.js');

Schemas.Post = new SimpleSchema({
	time: Schemas.defaults.createdAt, // TODO should be createdAt
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
	feeds: { // TODO should be feedIds
		type: [String],
		defaultValue: []
	},
	imageUrl: { // TODO should be [String], imageUrls
		type: String,
		optional: true
	},
	sellerId: { // TODO should be userId
		type: String
	},
	seller: { // TODO should use helper userName instead
		type: String,
		autoValue: function() {
			var sellerId = this.field('sellerId');
			return Schemas.autoValue.insert(this, function() {
				return Users.findOne(sellerId.value).profile.name;
			});
		}
	},
	score: {
		type: Number,
		autoValue: function() {
			var createdAt = this.field('time');
			return Schemas.autoValue.insert(this, function() {
				return createdAt.value.getTime();
			});
		}
	},
	fbId: {
		type: String,
		autoValue: function() {
			var sellerId = this.field('sellerId');
			return Schemas.autoValue.insert(this, function() {
				return Users.findOne(sellerId.value).profile.fbId;
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

// TODO change 'items' to 'posts'
Posts = new Meteor.Collection('items');

Posts.attachSchema(Schemas.Post);

Posts.allow({
	insert: function(userId, doc) {
		return userId && (userId === doc.sellerId || Roles.userIsInRole(userId, 'admin'));
	},
	update: function(userId, doc, fields, modifier) {
		return userId && (userId === doc.sellerId || Roles.userIsInRole(userId, 'admin'));
	},
	remove: function(userId, doc) {
		return userId && (userId === doc.sellerId || Roles.userIsInRole(userId, 'admin'));
	}
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
		return Users.findOne(this.sellerId).profile.name;
	}
});

Posts.create = function(type, post, callback) {
	return Meteor.call('_createPost', type, post, callback);
};

Posts.delete = function(_id, callback) {
	return Meteor.call('_deletePost', _id, callback);
};

Meteor.methods({
	_createPost: function(type, post) {
		if (!this.userId) {
			throw new Meteor.Error(403, "Access denied: you must be logged in");
		}
		post.sellerId = this.userId;
		post.type = type;
		return Posts.insert(post);
	},
	_deletePost: function(_id) {
		if (!this.userId) {
			throw new Meteor.Error(403, "Access denied: you must be logged in");
		}
		var sellerId = Posts.findOne(_id).sellerId;
		if (this.userId != sellerId && !Roles.userIsInRole(this.userId, 'admin')) {
			throw new Meteor.Error(600, "Access denied: this is not your post");
		}
		return Posts.remove(_id);
	}
});
