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

		var itemCommenters;
		if (item.commenters)
			itemCommenters = item.commenters;
		else
			itemCommenters = [];

		if (itemCommenters.indexOf(this.userId) == -1)
			itemCommenters.push(this.userId);

		if (!this.userId)
			return -1;
		Items.update({
			_id: id
		}, {
			$set: {
				commenters: itemCommenters,
				comments: comments,
				score: toAdd[3].getTime()
			}
		});

		//gives notification to the poster
		//if(this.userId != item.sellerId) {
		if (this.userId) {
			var postNotif = Notifications.findOne({
				userId: item.sellerId,
				postId: id,
			});
			if (postNotif) {
				var dupIndex = postNotif.commenters.indexOf(Meteor.user().profile.name);
				postNotif.commenters.splice(dupIndex, 1);
				postNotif.commenters.push(Meteor.user().profile.name);
				Notifications.update({
					_id: postNotif._id
				}, {
					$set: {
						read: false,
						seen: false,
						actorId: this.userId,
						commenters: postNotif.commenters
					}
				});
			} else {
				var tempNotif = {
					type: 1,
					userId: item.sellerId,
					postId: item._id,
					postName: item.title,
					actorId: this.userId,
					read: false,
					seen: false,
					commenters: [Meteor.user().profile.name]
				}
				Notifications.insert(tempNotif);
			}
		}
		//gives notifications to the commenters
		for (x in itemCommenters) {
			if (itemCommenters[x] != this.userId) {
				var uId = itemCommenters[x];
				var postNotif = Notifications.findOne({
					userId: uId,
					postId: id
				});
				if (postNotif) {
					var dupIndx = postNotif.commenters.indexOf(Meteor.user().profile.name);
					postNotif.commenters.splice(dupIndex, 1);
					postNotif.commenters.push(Meteor.user().profile.name);
					Notifications.update({
						_id: postNotif._id
					}, {
						$set: {
							read: false,
							seen: false,
							actorId: this.userId,
							commenters: postNotif.commenters
						}
					});

				} else {
					var tempNotif = {
						type: 2,
						userId: uId,
						postId: id,
						postName: item.title,
						actorId: this.userId,
						read: false,
						seen: false,
						commenters: [Meteor.user().profile.name]
					}
					Notifications.insert(tempNotif);
				}
			}
		}

		return toAdd;
	},
	deletePost: function(id) {
		var user = Meteor.user();
		var sellerId = Items.findOne({
			_id: id
		}).sellerId;
		if (!user || (!Roles.userIsInRole(user, 'admin') && Meteor.userId() != sellerId)) {
			throw new Meteor.Error(403, "Access denied");
		}
		Items.remove({
			_id: id
		});
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
