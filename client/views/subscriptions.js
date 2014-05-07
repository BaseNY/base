//Items, offers, messages, feeds, ftoi
var ITEMS_INCREMENT = 10;
Session.setDefault('ftoiLimit', ITEMS_INCREMENT);
Deps.autorun(function() {
	Meteor.subscribe('feeds');
//	Meteor.subscribe('items',getItemIdArray(FtoI.find().fetch()));
	Meteor.subscribe('userData');
	Meteor.subscribe('allUserData');
});
