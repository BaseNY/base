ITEMS_INCREMENT = 10;
Session.setDefault('itemsLimit', ITEMS_INCREMENT);
Template.feed.posts = function() {
	return Items.find({}, {
		sort: {
			time: -1
		},
		limit: Session.get('itemsLimit')
	}).fetch();
}
Template.feed.moreResults = function() {
	return Items.find().count() >= Session.get('itemsLimit');

}

/*
 * _id: "Ej9kjZRLTmuBMvaih"
 * comments: Array[2]
 * description: "sadf"
 * feeds: Array[1]
 * imageUrl: "https://s3.amazonaws.com/Basel/pics/xP22LtmpRc2rmDwn4/1399257901562-nycedc.png"
 * score: 1399257904413
 * seller: "Jasper Lu"
 * sellerId: "xP22LtmpRc2rmDwn4"
 * sold: false
 * time: Sun May 04 2014 22:45:04 GMT-0400 (EDT)
 * title: "sdfadsfs"
 */
