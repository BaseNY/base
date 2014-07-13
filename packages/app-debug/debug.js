var colors;
if (Meteor.isServer) {
	colors = Npm.require('colors');
	colors.setTheme({
		debug: 'blue',
		order: 'magenta'
	});
}

Meteor._ensure(Meteor, 'settings', 'public');

var log = function(msg, color) {
	if (msg && color && Meteor.isServer) {
		msg = msg[color];
	}
	console.log(msg || '');
};

var debugLog = function(namespace, color) {
	color = color || 'debug';
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

			log(c + ']', color);
			log(obj);
			log(c + ' end]', color);
		}
	}
}

// means debug for the package app-<key>
var packages = ['feed', 'home', 'messaging', 'offers', 'users', 'utils'];
Debug = {
	log: debugLog('debug'),
	order: function(fileName) {
		if (Meteor.settings.public.debug) {
			log('Load: ' + fileName, 'order');
		}
	}
};
_.each(packages, function(package) {
	Debug[package] = debugLog('app-' + package);
});

if (Meteor.settings.public.debug) {
	log('Debug enabled', 'red');
}
