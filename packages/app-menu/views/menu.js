Debug.order('app-menu/menu.js')

Template.menu.created = function() {
	Session.setDefault('degree', 'everyone');
	Session.setDefault('buy', true);
	Session.setDefault('sell', true);
};

Template.menu.rendered = function() {
	this.$("#menu").mmenu({
		isMenu: false
	}).css('display', '');
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
		if (type === 'feed') {
			var router = Router.current();
			if (router) {
				var params = router.params;
				checked = params.id === value;
			}
		} else {
			checked = Session.equals(type, value);
		}
		return checked ? 'menu-checked' : '';
	}
});

Template.menuFeeds.helpers({
	feeds: function() {
		if (Meteor.isLoggedIn()) {
			var feeds = Feeds.find({
				_id: {$in: Meteor.user().subscribed},
				name: {$ne: 'Others'}
			}, {
				sort: {name: 1}
			}).fetch();
			feeds.push(Feeds.findOne({name: 'Others'}));
			return feeds;
		}
	}
});
