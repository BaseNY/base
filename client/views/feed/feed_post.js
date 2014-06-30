Template.feedPost.helpers({
	'imgUrl': function() {
		var url = Meteor.users.findOne({
			_id: this.sellerId
		}).profile.img;
		return url;
	},
	'timestamp': function() {
		return timify(this.time);
	},
	'isSellPost': function() {
			return this.buy != true;
	},
	'feed': function() {
		return Feeds.findOne({
                    _id:  {$in: this.feeds}
		});
	},
	'comments': function() {
		return this.comments;
	},
	'ownPost': function() {
		return this.sellerId == Meteor.userId();
	},
        'myImgUrl': function() {
            return Meteor.user().profile.img;
        }
});

Template.feedPost.rendered = function() {
	$('.commentForm').on('activate', function() {
		$(this).empty();
		var range, sel;
		if ((sel = document.selection) && document.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(this);
			range.select();
		}
	});

	$('.commentForm').focus(function() {
		if (this.hasChildNodes() && document.createRange && window.getSelection) {
			$(this).empty();
			var range = document.createRange();
			range.selectNodeContents(this);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		}
	});
}

Template.feedPost.events({
	'keypress .commentForm': function(e) {
		if (e.charCode == 13) {
			e.preventDefault();
			console.log(e);
			text = $(e.target).html();

			text.trimLeft(' ');
			if (text != '') {
				text.trimRight(' ');
				Meteor.call('addComment', text, this._id, function(e, r) {
					if (e)
						alert(e);
				});
			}
			$(e.target).empty();
		}
	},
	'click .fa-envelope-o': function() {
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
		return timify(this[3]);
	},
	'imgUrl': function() {
		return this[2];
	}
});
