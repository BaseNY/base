Schemas.Comment = new SimpleSchema({
	time: Schemas.defaults.createdAt, // TODO should be createdAt
	userId: {
		type: String,
		autoValue: function() {
			return Schemas.autoValue.insert(this, this.userId);
		}
	},
	url: { // TODO should use the user id to get the image of the user
		type: String,
		autoValue: function() {
			var userId = this.userId;
			return Schemas.autoValue.insert(this, function() {
				var imageUrl = Users.findOne(userId).profile.img;
				return imageUrl;
			});
		}
	},
	postId: {
		type: String
	},
	text: {
		type: String
	}
});

Comments = new Meteor.Collection('comments');

Comments.before.insert(function(userId, doc) {
	/*Posts.update(doc.postId, {
		$addToSet: {
			commenters: userId
		}
	}, callback);
	var post = Posts.findOne(doc.postId);
	if (userId !== post.sellerId) {

	}*/
});

Comments.addComment = function(postId, text, callback) {
	var comment = {
		postId: postId,
		text: text
	};
	Comments.insert(comment, callback);
};

Meteor.methods({
	addComment: function(t, id) {
                if(!Meteor.user())
                    return -1;

		url = Meteor.users.findOne({
			_id: this.userId
		}).profile.img;

        comment = {
            userId: this.userId,
            postId: id,
            text: t,
            time: new Date(),
            url: url
        }

        item = Posts.findOne({_id: id});

		var itemCommenters;
		if (item.commenters)
			itemCommenters = item.commenters;
		else
			itemCommenters = [];

		if (itemCommenters.indexOf(this.userId) == -1)
			itemCommenters.push(this.userId);

		if (!this.userId)
			return -1;
		Posts.update({
			_id: id
		}, {
			$set: {
				commenters: itemCommenters,
                score: comment.time
			}
		});

        Comments.insert(comment);

		//gives notification to the poster
		if(this.userId != item.sellerId) {
		//if (this.userId) {
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
        return comment;
	},
    changeComments: function() {
        _.each(Posts.find().fetch(), function(o) {
            pId = o._id;
            _.each(o.comments, function(i) {
                tempComment = {
                    userId: i[0],
                    postId: pId,
                    text: i[1],
                    time: i[3],
                    url: i[2]
                }
                Comments.insert(tempComment);
            });
        });
    }
});
