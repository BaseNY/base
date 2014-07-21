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
		autoValue: function() {
			if (!this.isSet && (this.isInsert || this.isUpsert)) {
				return Schemas.autoValue.insert([]);
			}
		}
	},
	imageUrl: { // TODO should be [String], imageUrls
		type: String,
		optional: true
	},
	sellerId: {
		type: String,
		autoValue: function() {
			return Schemas.autoValue.insert(this, this.userId);
		}
	},
	seller: {
		type: String,
		autoValue: function() {
			var sellerName = Users.findOne(this.userId).profile.name;
			return Schemas.autoValue.insert(this, sellerName);
		}
	},
	score: {
		type: Number,
		autoValue: function() {
			if (this.isInsert || this.isUpsert) {
				var createdAt = this.field('time').value;
				return Schemas.autoValue.insert(this, createdAt.getTime());
			}
		}
	},
	fbId: {
		type: String,
		autoValue: function() {
			var id = Users.findOne(this.userId).profile.fbId;
			return Schemas.autoValue.insert(this, id);
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
					//return new Date;
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

Meteor.methods({
	addPost: function(p) {
                if(!Meteor.user())
                    return -1;
		console.log('called');
		p.sellerId = this.userId;
		p.seller = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.name;
		p.sold = false;
		p.fbId = Meteor.user().profile.fbId;
		p.score = p.time.getTime();
		//p.imageUrl = S3.imageUpload(this.userId, p.image);
		var temp = Posts.insert(p);
		//	if (p.imageUrl == null)
		//		return -1;
		if (p.title == null)
			return -2;
		else if (p.description == null)
			return -3;
		else if (p.feeds == null)
			return -4;
		console.log(temp);
		//linker. pushes the id of the item, and the id of the category
		// _.each(p.feeds, function(feed) {
		// 	Feeds.update({
		// 		_id: feed
		// 	}, {
		// 		$push: {
		// 			items: temp
		// 		}
		// 	});
		// });
		return temp;
	},
	addPostImage: function(id, url) {
		return Posts.update({
			_id: feed
		}, {
			$set: {
				imageUrl: url
			}
		});
	},
	addRequest: function(p) {
		p.sellerId = this.userId;
		p.seller = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.name;
		p.score = p.time.getTime();
		p.fbId = Meteor.user().profile.fbId;
		if (p.description == null)
			return -3;
		else if (p.feeds == null)
			return -4;
		var temp = Posts.insert(p);
		// _.each(p.feeds, function(feed) {
		// 	Feeds.update({
		// 		_id: feed
		// 	}, {
		// 		$push: {
		// 			items: temp
		// 		}
		// 	});
		// });
		return temp;
	},
	deletePost: function(id) {
		var user = Meteor.user();
		var sellerId = Posts.findOne({
			_id: id
		}).sellerId;
		if (!user || (!Roles.userIsInRole(user, 'admin') && Meteor.userId() != sellerId)) {
			throw new Meteor.Error(403, "Access denied");
		}
		Posts.remove({
			_id: id
		});
	}
});
