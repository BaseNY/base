Template.menu.created = function() {
	Session.setDefault('degree', 'everyone');
	Session.setDefault('buy', true);
	Session.setDefault('sell', true);
};

Template.menu.rendered = function() {
	this.$("#menu").mmenu({
		isMenu: false
	});
};

Template.menuItem.events({
	'click .menu-item': function(e) {
		var $item = $(e.currentTarget);
		var type = $item.data('filter-type'),
			value = $item.data('filter-value');

		if (type === 'buy' || type === 'sell') {
			var equal = Session.equals(type, value);
			Session.set(type, equal ? null : value);
		} else {
			Session.set(type, value);
		}
	}
});

Template.menuItem.helpers({
	checked: function(type, value) {
		return Session.equals(type, value) ? 'menu-checked' : '';
	}
});
