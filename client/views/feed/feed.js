Template.feed.posts = function() {
<<<<<<< HEAD
	//return FtoI.find().fetch();
        return Items.find({},{sort: {score: -1}}).fetch();
	// return FtoI.find({},{sort: {score:1}}).fetch();
=======
	return Items.find().fetch();
>>>>>>> 2fc43abc3ffa5749c79f87f3f8de4d42eb7b19a8
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
