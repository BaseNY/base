Meteor.isLoggedIn = function() {
	return !!Meteor.user();
};

Utils = {
	// generates a publish function that simply allows selector and options pass through
	generatePublishFunction: function(collection) {
		return function(selector, options) {
			if (!selector) {
				selector = {};
			}
			if (!options) {
				options = {};
			}
			return collection.find(selector, options);
		};
	}
};

if (Meteor.isClient) {
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
}
