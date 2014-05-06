//Items, offers, messages, feeds, ftoi
var ITEMS_INCREMENT = 10;
Session.setDefault('ftoiLimit', ITEMS_INCREMENT);
Deps.autorun(function() {
	Meteor.subscribe('messages');
	Meteor.subscribe('feeds');
	Meteor.subscribe('offers');
	Meteor.subscribe('items');
	Meteor.subscribe('userData');
	Meteor.subscribe('allUserData');
});
