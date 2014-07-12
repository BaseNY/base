UI.helpers = function(helpers) {
	_.each(helpers, function(func, name) {
		UI.registerHelper(name, func);
	});
};

UI.helpers({
	json: function(context) {
		return JSON.stringify(context);
	},
	isEqual: function(a, b) {
		return a === b;
	},
	profile: function() {
		var user = Meteor.user();
		if (user) {
			return user.profile;
		}
	},
	currentUserId: function() {
		return Meteor.userId();
	}
});
