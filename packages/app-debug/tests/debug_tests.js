// NOTE: check the console when running tests

Meteor.settings.public.debug = true;

Tinytest.add("app-debug - Debug.order", function(test) {
	Debug.order('tests/debug_tests.js');
});

Tinytest.add("app-debug - Debug.log", function(test) {
	Debug.log('TEST LOG');
	Debug.log('description', 'obj');
});
