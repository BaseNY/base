Debug.order('app-feeds/feed.js');

Template.feed.moreResults = function() {
	return Items.find().count() >= Session.get('itemsLimit');
}

// infinite scroll
$(window).scroll(function showMoreVisible() {
	var threshold, target = $('#showMoreResults');
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - target.height();
	if (target.offset().top <= threshold) {
		if (!target.data('visible')) {
			target.data('visible', true);
			Session.set('itemsLimit', Session.get('itemsLimit') + ITEMS_INCREMENT);
		}
	} else {
		if (target.data('visible')) {
			target.data('visible', false);
		}
	}
});

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