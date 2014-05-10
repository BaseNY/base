Template.feed.posts = function() {
	return Items.find({}, {sort: {score: -1}}).fetch();
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
