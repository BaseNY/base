Debug.order('app-utils/ui_helpers.js');

var _ = lodash;

/**
 * @param {object} helpers An object in the form {functionName: function}
 *
 * @dependencies templating (blaze)
 */
Template.registerHelpers = function(helpers) {
	_.each(helpers, function(func, name) {
		Template.registerHelper(name, func);
	});
};

Template.registerHelpers({
	/**
	 * @dependencies ejson
	 */
	json: function(obj) {
		return EJSON.stringify(obj);
	},
	isEqual: function(a, b) {
		return a === b;
	},

	/**
	 * @dependencies accounts-base
	 */
	profile: function() {
		var user = Meteor.user();
		if (user) {
			return user.profile;
		}
	},
	/**
	 * @dependencies accounts-base
	 */
	currentUserId: function() {
		return Meteor.userId();
	}
});
