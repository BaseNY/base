var _ = lodash;

var theme = {
	debug: 'blue',
	order: 'magenta'
};
if (Meteor.isServer) {
	var colors = Npm.require('colors');
	colors.setTheme(theme);
}

Meteor._ensure(Meteor, 'settings', 'public');

Debug = {};
Debug.enabled = function() {
	return Meteor.settings.public.debug;
};

var logColor = function(msg, color) {
	if (msg && color) {
		if (_.has(theme, color)) {
			color = theme[color];
		}
		if (Meteor.isClient) {
			console.log('%c' + msg, 'color: ' + color);
		} else if (Meteor.isServer) {
			console.log(msg[color]);
		}
	} else {
		console.log(msg);
	}
};

var logDebug = function(namespace, color) {
	color = color || 'debug'; // debug is the default color
	return function() {
		if (Debug.enabled()) {
			var desc, obj;
			if (arguments.length === 2) {
				desc = arguments[0];
				obj = arguments[1];
			} else {
				obj = arguments[0];
			}

			var c = '';
			if (namespace) {
				c += namespace;
			}
			if (desc) {
				c += ' - ' + desc;
			}

			logColor('[▼ ' + c + ' ▼]', color);
			logColor(obj, color);
			logColor('[▲ ' + c + ' ▲]', color);
		}
	};
};

Debug.order = function(filename) {
	Meteor.settings.public.debug && logColor('Load: ' + filename, 'order');
};
Debug.log = logDebug('debug');

if (Debug.enabled()) {
	logColor('Debug enabled', 'red');
}
