Template.homeSidebar.rendered = function() {
    Session.set('buyOn', true);
    Session.set('sellOn', true);
}

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

Template.homeSidebarFilters.helpers({
    'buyOn': function() {
        return Session.get('buyOn');
    },
    'sellOn': function() {
        return Session.get('sellOn');
    }
});

Template.homeSidebarUser.helpers({
    'everyoneFilter': function() {
	if(Session.get('degrees'))
		return Session.get('degrees') == 0;
	else
		return true;
    },
    'friendsFilter': function() {
	if(Session.get('degrees'))
		return Session.get('degrees') == 1;
	else
		return false;
}
});

Template.homeSidebarFilters.events({
    'click #filter-buy' : function() {
        var b = Session.get('buyOn');
        if(b == true)
            b = false;
        else
            b = true;
        Session.set('buyOn', b);
    },
    'click #filter-sell' : function() {
        var b = Session.get('sellOn');
        if(b == true)
            b = false;
        else
            b = true;
        Session.set('sellOn', b);
    }
});

Template.homeSidebar.events({
    'click #filter-everyone': function() {
        Session.set('degrees', 0);
    },
    'click #filter-friends': function() {
	Meteor.call('updateFriends');
        Session.set('degrees', 1);
    },
    'click #filter-fof': function() {
        Session.set('degrees', 2);
    }
});
