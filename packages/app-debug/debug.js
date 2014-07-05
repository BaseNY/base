Meteor._ensure(Meteor, 'settings', 'public');

var debug = function(namespace) {
	return function() {
		if (Meteor.settings.public.debug) {
			if (arguments.length === 2) {
				var desc = arguments[0],
					obj = arguments[1];
				var c = '[';
				if (namespace) {
					c += namespace + ' - ';
				}
				c += desc;
				console.log(c + ']');
				console.log(obj);
				console.log(c + ' end]');
			} else {
				console.log(arguments[0]);
			}
		}
	}
}

// means debug for the package app-<key>
var packages = ['feed', 'messaging', 'users']
Debug = {};
_.each(packages, function(package) {
	Debug[package] = debug('app-' + package);
});
