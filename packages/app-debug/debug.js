Meteor._ensure(Meteor, 'settings', 'public');

var debug = function(namespace) {
	return function() {
		if (Meteor.settings.public.debug) {
			var desc, obj;
			if (arguments.length === 2) {
				desc = arguments[0];
				obj = arguments[1];
			} else {
				obj = arguments[0];
			}

			var c = '[';
			if (namespace) {
				c += namespace;
			}
			if (desc) {
				c += ' - ' + desc;
			}

			console.log();
			console.log(c + ']');
			console.log(obj);
			console.log(c + ' end]');
		}
	}
}

// means debug for the package app-<key>
var packages = ['feed', 'messaging', 'offers', 'users', 'utils'];
Debug = {
	log: debug()
};
_.each(packages, function(package) {
	Debug[package] = debug('app-' + package);
});
