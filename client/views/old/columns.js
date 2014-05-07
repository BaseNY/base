Template.homeSidebar.helpers({
	'feeds': function() {
		var temp = [];
		var l = Meteor.user().profile.subscribed;
		for (x in l) {
			temp.push(Feeds.findOne({
				_id: l[x]
			}));
		}
		return temp;
	},
	'currentFeed': function() {
		if (Router.current().data())
			return Router.current().data().feed._id == this._id;
	},
	'allFeed': function() {
		return !Router.current().data();
	}
});

Template.homeSidebarFeeds.helpers({
	'feeds': function() {
		var temp = [];
		var l = Meteor.user().profile.subscribed;
		for (x in l) {
			temp.push(Feeds.findOne({
				_id: l[x]
			}));
		}
		return temp;
	},
	'currentFeed': function() {
		if (Router.current().data())
			return Router.current().data().feed._id == this._id;
        },
	'allFeed': function() {
		return !Router.current().data();
	}
});

Template.homeSidebar.events({
	'click #filter-everyone': function() {
		Session.set('degrees', 0);
	},
	'click #filter-friends': function() {
		Session.set('degrees', 1);
	},
	'click #filter-fof': function() {
		Session.set('degrees', 2);
	}
});
