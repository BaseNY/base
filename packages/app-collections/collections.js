Debug.order('app-collections/collections.js');

Mongo.Collection.prototype.allowAll = function(func) {
	this.allow({
		insert: func,
		update: func,
		remove: func
	});
};

Collections = {
	allow: {
		/**
		 * @dependencies alanning:roles
		 */
		admin: function(userId) {
			return userId && Roles.userIsInRole(userId, 'admin');
		}
	}
};
