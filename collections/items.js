Items = new Meteor.Collection('items');

Meteor.methods({
	addPost: function(p) {
		console.log('called');
		p.sellerId = this.userId;
		p.seller = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.name;
		p.sold = false;
		p.fbId = Meteor.user().profile.fbId;
		p.time = new Date();
		p.score = p.time.getTime();
		//p.imageUrl = s3ImageUpload(this.userId, p.image);
		var temp = Items.insert(p);
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
		return Items.update({
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
		p.time = new Date();
		p.score = p.time.getTime();
		p.fbId = Meteor.user().profile.fbId;
		if (p.description == null)
			return -3;
		else if (p.feeds == null)
			return -4;
		var temp = Items.insert(p);
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
	addComment: function(t, id) {
		item = Items.findOne({
			_id: id
		});
		comments = item.comments;
		if (comments == undefined)
			comments = [];
		url = Meteor.users.findOne({
			_id: this.userId
		}).profile.img;
		toAdd = [this.userId, t, url, new Date()];
		comments.push(toAdd);
		console.log(comments);
		if (!this.userId)
			return -1;
		Items.update({
			_id: id
		}, {
			$set: {
				comments: comments,
				score: toAdd[3].getTime()
			}
		});
		return toAdd;
	},
	markSold: function(item) {
		Items.update({
			_id: item._id
		}, {
			$set: {
				sold: true
			}
		});
	}
});
