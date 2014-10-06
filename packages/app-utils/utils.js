Debug.order('app-utils/utils.js');

/**
 * @return {Boolean} Whether the current user is logged in
 *
 * @dependencies accounts-base
 * @locus Client
 */
if (Meteor.isClient) {
	Meteor.isLoggedIn = function() {
		return !!Meteor.user();
	};
}

Utils = {};
/**
 * Generates a default publish handler that accepts a selector and options.
 */
Utils.defaultPublishHandler = function(collection) {
	return function(selector, options) {
		selector = selector || {};
		options = options || {};
		return collection.find(selector, options);
	};
};
