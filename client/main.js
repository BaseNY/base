Template.header.events({
    'click #show-notifs': function() {
        if(Session.get('showNotifs'))
            Session.set('showNotifs', false);
        else {
            Meteor.call('clearNotif', {});
            Session.set('showNotifs', true);
        }
    }
});
Template.header.helpers({
	'newMsgs': function() {
		var num = Meteor.user().new_message;
		if (num)
			return num;
		else
			return '';
	},
    'showNotifs': function() {
        if(Session.get('showNotifs'))
            return true;
        else 
            return false;
    },
    'newNotifs': function() {
        var num = Notifications.find({read: false}).count();
        if(num)
            return num;
        else
            return '';
    },
    'notifs': function() {
        return Notifications.find().fetch();
    },
    'unread': function() {
        return !this.read;
    },
    'text': function() {
        return formatNotif(this);
    },
    'notifImage' : function() {
        return Meteor.users.findOne({_id: this.actorId}).profile.img;
    }
});

Template.header.events({
	'click .fa-sign-out': function() {
		Meteor.logout();
	},
});
