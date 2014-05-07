<<<<<<< HEAD
Template.header.helpers({
    'imgUrl' : function() {
        var url = Meteor.user().profile.img;
        return url;
    },
	'name': function() {
    	return Meteor.user().profile.name;
	}
});

Template.header.events({
    'click .fa-sign-out' : function() {
        Meteor.logout();
    },
});
=======
UI.helpers = function(helpers) {
	_.each(helpers, function(func, name) {
		UI.registerHelper(name, func);
	});
};
>>>>>>> 97daf934619db66abded280b25fd62b533d9fd3a

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
