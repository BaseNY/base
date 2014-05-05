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

UI.registerHelper('json', function(context) {
	return JSON.stringify(context);
});
