/*
Template.ifEven.isEven = function(i) {
	return i % 2 == 0;
}
*/

/*
Template.modalPic.imgUrl = function() {
	return Session.get('imgUrl');
}
*/

Template.feedPost.helpers({
	'imgUrl': function() {
		var i = Items.findOne({
			_id: this.itemId
		});
                if(!i)
                    return '';
		var url = Meteor.users.findOne({
			_id: i.sellerId
		}).profile.img;
		return url;
	},
	'timestamp': function() {
		return timify(Items.findOne({
			_id: this.itemId
		}).time);
	},
	'isSellPost': function() {
		if (Items.findOne({
			_id: this.itemId
		}) != undefined)
			return Items.findOne({
				_id: this.itemId
			}).buy != true;
		else
			return false;
	},
	'item': function() {
		return Items.findOne({
			_id: this.itemId
		});
	},
	'feed': function() {
		return Feeds.findOne({
			_id: this.feedId
		});
	},
	'comments': function() {
		return Items.findOne({
			_id: this.itemId
		}).comments;
	}
});

Template.feedPost.rendered = function() {
	$('div').on('activate', function() {
		$(this).empty();
		var range, sel;
		if ((sel = document.selection) && document.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(this);
			range.select();
		}
	});

	$('div').focus(function() {
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
				Meteor.call('addComment', text, this.itemId, function(e, r) {
					if (e)
						alert(e);
				});
			}
			$(e.target).empty();
		}
	},
	'click .fa-envelope': function() {
		$('.msgContainer').toggleClass('noshow');
	},
	'click .fa-angle-down': function() {

	},
        /*
	'click img': function(e) {
		Session.set('imgUrl', $(e.target).attr('src'));
	}
        */
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
