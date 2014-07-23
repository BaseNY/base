Meteor.Collection.prototype.exists = function(selector) {
	return this.find(selector, {limit:1}).count() > 0;
};
