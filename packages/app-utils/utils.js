Debug.order('app-utils/utils.js');

Meteor.isLoggedIn = function() {
	return !!Meteor.userId();
};

Utils = {
	/**
	 * Generates a publish function that simply allows selector and options pass through.
	 * @param  {Meteor.Collection}			collection	Meteor collection
	 * @return {Meteor.Collection.Cursor}				Search cursor
	 */
	defaultPublishFunction: function(collection) {
		return function(selector, options) {
			//Debug.utils('In publish function for ' + collection._name);
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
