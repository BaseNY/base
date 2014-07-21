var colors;
var theme = {
	debug: 'blue',
	order: 'magenta'
};
if (Meteor.isServer) {
	colors = Npm.require('colors');
	colors.setTheme(theme);
}

Meteor._ensure(Meteor, 'settings', 'public');

var log = function(msg, color) {
	var args = [msg];
	if (msg && color) {
		if (Meteor.isClient) {
			if (_.has(theme, color)) {
				color = theme[color];
			}
			args = ['%c' + msg, 'color: ' + color];
		} else if (Meteor.isServer) {
			args = [msg[color]];
		}
	}
	console.log.apply({}, args);
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
var packages = ['feed', 'home', 'login', 'messaging', 'menu', 'offers', 'users', 'utils', 'collections'];
Debug = {
	log: debugLog('debug'),
	order: function(filename) {
		if (Meteor.settings.public.debug) {
			log('Load: ' + filename, 'order');
		}
	}
};
_.each(packages, function(package) {
	Debug[package] = debugLog('app-' + package);
});

if (Meteor.settings.public.debug) {
	log('Debug enabled', 'red');
}
