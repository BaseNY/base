Template.feed.posts = function() {
	return FtoI.find().fetch();
	// return FtoI.find({},{sort: {score:1}}).fetch();
}
