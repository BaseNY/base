Debug.order('app-utils/utils.js');

Meteor.isLoggedIn = function() {
	return !!Meteor.userId();
};

/**
 * Create meteor methods with a check for whether the user is logged in.
 * @param  {{func}} methods Dictionary of methods to create
 */
Meteor.methodsRequireLogin = function(methods) {
	_.each(methods, function(func, name) {
		methods[name] = function() {
			if (!this.userId) {
				throw new Meteor.Error(100, "Access denied: User not logged in");
			}
			return func.apply(this, arguments);
		};
	});
	Meteor.methods(methods);
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
	},
	forwardMeteorMethod: function(name) {
		return function() {
			var args = arguments;
			var callback = _.last(args);
			if (_.isFunction(callback)) {
				return Meteor.apply(name, _.initial(args), callback);
			} else {
				return Meteor.apply(name, args);
			}
		};
	}
};
