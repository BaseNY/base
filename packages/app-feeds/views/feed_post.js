Debug.order('app-feeds/feed_post.js');

Template.feedPost.helpers({
	'imgUrl': function() {
		var url = Meteor.users.findOne({
			_id: this.sellerId
		}).profile.img;
		return url;
	},
	'timestamp': function() {
		return Utils.timify(this.time);
	},
	'isSellPost': function() {
		return this.buy != true;
	},
	'feed': function() {
		return Feeds.findOne({
			_id: {
				$in: this.feeds
			}
		});
	},
	'comments': function() {
		return this.comments;
	}
});

Template.feedIcons.helpers({
	'ownPost': function() {
		return this.sellerId == Meteor.userId();
	}
});

Template.feedPost.events({
	'keypress .post-comment-input': function(e) {
		if (e.charCode == 13) {
			if (!Meteor.user()) {
				RModal.openModal($('#login-modal'));
				return -1;
			}
			e.preventDefault();
			console.log(e);
			text = $(e.target)[0].innerText;

			text.trimLeft(' ');
			if (text != '') {
				text.trimRight(' ');
				Meteor.call('addComment', text, this._id, function(e, r) {
					if (e) {
						console.log(e);
					}
				});
			}
			$(e.target).empty();
		}
	},
	'click .toggleMessage': function() {
		console.log(this);
		$('#msgCont-' + this._id).toggleClass('noshow');
	},
	'click .fa-trash-o': function() {
		Meteor.call('deletePost', this._id, function(e, r) {
			if (e) {
				alert(e);
			}
		});
	}
});

Template.comment.helpers({
	'name': function() {
		u = Meteor.users.findOne({
			_id: this[0]
		});
		if (u == undefined)
			return '';
		return u.profile.name;
	},
	'id': function() {
		return this[0];
	},
	'text': function() {
		return this[1];
	},
	'timestamp': function() {
		return Utils.timify(this[3]);
	},
	'imgUrl': function() {
		return this[2];
	}
});
