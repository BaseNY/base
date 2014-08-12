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
			Debug.collections('Allow - access denied', {
				userId: userId,
				error: 'User is not logged in or user is not admin'
			});
			return userId && Roles.userIsInRole(userId, 'admin');
		}
	}
};
