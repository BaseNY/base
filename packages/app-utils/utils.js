Meteor.isLoggedIn = function() {
	return !!Meteor.userId();
};

console.logObj = function(desc, obj) {
	console.log('[' + desc + ']');
	console.log(obj);
	console.log('[' + desc + ' end]');
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
