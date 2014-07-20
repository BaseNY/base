Debug.order('app-collections/collections/items.js');

Schemas.Post = new SimpleSchema({
	time: Schemas.defaults.createdAt
});

Posts = new Meteor.Collection('items');

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
		/*
           es.create({
           index: 'base',
           type: 'item',
           body: {
           name: p.title,
           desc: p.description,
           image: p.imageUrl
           }
           });
           */
		console.log(temp);
		//linker. pushes the id of the item, and the id of the category
		_.each(p.feeds, function(feed) {
			Feeds.update({
				_id: feed
			}, {
				$push: {
					items: temp
				}
			});
		});
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
		_.each(p.feeds, function(feed) {
			Feeds.update({
				_id: feed
			}, {
				$push: {
					items: temp
				}
			});
		});
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
	},
	markSold: function(item) {
		Posts.update({
			_id: item._id
		}, {
			$set: {
				sold: true
			}
		});
	}
});
