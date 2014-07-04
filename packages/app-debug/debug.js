var colors = Npm.require('colors');

Meteor._ensure(Meteor, 'settings', 'public');

debug = function() {
	if (Meteor.settings.public.debug) {
		if (arguments.length === 2) {
			var desc = arguments[0],
				obj = arguments[1];
			console.log(('[' + desc + ']').red);
			console.log(obj);
			console.log(('[' + desc + ' end]').red);
		} else {
			console.log(arguments[0]);
		}
	}
};