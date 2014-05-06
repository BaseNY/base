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
	}
});

Template.header.events({
	'click .fa-sign-out': function() {
		Meteor.logout();
	},
});
