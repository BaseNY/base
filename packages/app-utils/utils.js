Meteor.isLoggedIn = function() {
	return !!Meteor.userId();
};

console.logObj = function(desc, obj) {
	console.log('[' + desc + ']');
	console.log(obj);
	console.log('[' + desc + ' end]');
};
