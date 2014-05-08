Template.homeSidebar.helpers({
	'feeds': function() {
		var subscribed = Meteor.user().profile.subscribed;
		return Feeds.find({_id: {$in: subscribed}});
	},
	'currentFeed': function() {
		if (Router.current().data()) {
			return Router.current().data().feed._id == this._id;
		}
	},
	'allFeed': function() {
		return !Router.current().data();
	}
});

Template.homeSidebarFeeds.helpers({
	'feeds': function() {
		if(!Meteor.user()) {
		    return [];
		}
		var subscribed = Meteor.user().profile.subscribed;
		return Feeds.find({_id: {$in: subscribed}});
	},
	'currentFeed': function() {
		if (Router.current().data()) {
			return Router.current().data().feed._id == this._id;
		}
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
