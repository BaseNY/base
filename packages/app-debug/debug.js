Meteor._ensure(Meteor, 'settings', 'public');

debug = function() {
	if (Meteor.settings.public.debug) {
		if (arguments.length === 2) {
			var desc = arguments[0],
				obj = arguments[1];
			console.log('[' + desc + ']');
			console.log(obj);
			console.log('[' + desc + ' end]');
		} else {
			console.log(arguments[0]);
		}
	}
};