Template.header.helpers({
    'imgUrl' : function() {
        var u = Meteor.user().services.facebook;
        url = u.img;
        if(url == null)
            url = 'http://graph.facebook.com/' + u.id + '/picture';
        return url;
    }
});
/*
Meteor.startup(function() {
	NProgress.start();
});
*/
