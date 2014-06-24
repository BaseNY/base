UI.helpers = function(helpers) {
	_.each(helpers, function(func, name) {
		UI.registerHelper(name, func);
	});
};

UI.helpers({
	'json': function(context) {
		return JSON.stringify(context);
	},
	'profile': function() {
		return Meteor.user().profile;
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
    'newNotifs': function() {
        return Notifications.find().count();
    },
    'notifs': function() {
        return Notifications.find().fetch();
    },
    'unread': function() {
        return !this.read;
    },
    'text': function() {
        return formatNotif(this);
    }
});

Template.header.events({
	'click .fa-sign-out': function() {
		Meteor.logout();
	},
});
