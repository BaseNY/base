Meteor.Collection.prototype.allowAll = function(func) {
	this.allow({
		insert: func,
		update: func,
		remove: func
	});
};

Collections = {
	allow: {
		admin: function(userId) {
			return userId && Roles.userIsInRole(userId, 'admin');
		}
	}
};
