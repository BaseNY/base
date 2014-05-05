UI.registerHelper('json', function(context) {
	return JSON.stringify(context);
});

Template.header.helpers({
    'imgUrl' : function() {
        var url = Meteor.user().profile.img;
        return url;
    },
	'name': function() {
    	return Meteor.user().profile.name;
	},
    'newMsgs': function() {
        var num = Meteor.user().new_message;
        if(num)
            return num;
        else
            return '';
    }
});

Template.header.events({
    'click .fa-sign-out' : function() {
        Meteor.logout();
    },
});