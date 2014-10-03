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

var debugEnabled = Meteor.settings.public.debug;

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
	if (!debugEnabled) {
		return function() {};
	}
	color = color || 'debug'; // debug is the default color
	return function() {
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
	};
};

Debug = {
	enabled: debugEnabled,
	log: logDebug('debug'),
	order: function(filename) {
		debugEnabled && logColor('Load: ' + filename, 'order');
	}
};

// TODO delete this
// means debug for the package app-<key>
var packages = ['feed', 'home', 'login', 'messaging', 'menu', 'offers', 'users', 'utils', 'collections'];
_.each(packages, function(package) {
	Debug[package] = logDebug('app-' + package);
});
// DELETE THIS END

if (debugEnabled) {
	logColor('Debug enabled', 'red');
}
