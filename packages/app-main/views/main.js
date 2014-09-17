Template.layoutBody.events({
	'focus [contenteditable=true]': function(e) {
		var $target = $(e.currentTarget);
		if ($target.children('.placeholder').length !== 0) {
			$target.empty();
		}
	},
	'blur [contenteditable=true]': function(e) {
		var $target = $(e.currentTarget);
		if ($target.html().trim() === '') {
			$target.setPlaceholder();
		}
	}
});

Template.header.events({
	'click #show-notifs': function(e) {
		e.stopPropagation();
		if (Session.get('showNotifs')) {
			Session.set('showNotifs', false);
		} else {
			if (Notifications.findOne({seen: false})) {
				Meteor.call('glossedNotifs');
			}
			Session.set('showNotifs', true);
		}
	}
});

Template.header.rendered = function() {
	$("body").click(function(e) {
		if (Session.get('showNotifs')) {
            e.stopPropagation();
			if (!(e.target.id == "notif-dropdown" || $(e.target).parents("#notif-dropdown").size())) {
				Session.set('showNotifs', false);
			}
		}
	});
        Meteor.call('getNotice', function(e, r) {
            Session.set('notice', r);
        });
};

Template.header.helpers({
	'newMsgs': function() {
		var num = Meteor.user().new_message;
		if (num)
			return num;
		else
			return '';
	},
	'showNotifs': function() {
		if (Session.get('showNotifs'))
			return true;
		else
			return false;
	},
	'newNotifs': function() {
		var num = Notifications.find({
			seen: false
		}).count();
		if (num)
			return num;
		else
			return '';
	},
	'notifs': function() {
		return Notifications.find().fetch();
	},
	'unreadConversations': function() {
		return Conversations.countUnreadFor(Meteor.userId());
	},
        'notice': function() {
                if(Session.get('notice'))
                    return Session.get('notice');
        }
});

Template.notification.helpers({
	'unread': function() {
		return !this.read;
	},
	'text': function() {
		return Utils.formatNotif(this);
	},
	'notifImage': function() {
		return Meteor.users.findOne({
			_id: this.actorId
		}).profile.img;
	}
});

Template.header.events({
	'click .fa-sign-out': function() {
		Meteor.logout();
	},
	'click .notif-link': function(e) {
		Session.set('showNotifs', false);
		Meteor.call('clearNotif', this._id);
	}
});
