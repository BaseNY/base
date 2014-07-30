Meteor._ensure(Meteor, 'settings', 'public');

Template.debugOrder.helpers({
	debugEnabled: function() {
		return Meteor.settings.public.debug;
	}
});
