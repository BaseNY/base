UI.helpers = function(helpers) {
	_.each(helpers, function(func, name) {
		UI.registerHelper(name, func);
	});
};

UI.helpers({
	json: function(context) {
		return JSON.stringify(context);
	},
	profile: function() {
		return Meteor.user().profile;
	},
	isEqual: function(a, b) {
		return a === b;
	}
});
