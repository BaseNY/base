Meteor.publish('items', function(selector, options) {
	if (!selector) {
		selector = {};
	}
	if (!options) {
		options = {};
	}
	return Items.find(selector, options);
});
