Template.homeFeed.helpers({
    showImage: function() {
    	return Session.get('imgUrl');
    },
    posts: function() {
        return FtoI.find().fetch();
    }
});
