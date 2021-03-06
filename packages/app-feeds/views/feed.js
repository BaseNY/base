Debug.order('app-feeds/feed.js');

Meteor.startup(function() {
    data = new ReactiveDict;
    var updateWidth = function() {
        data.set('width', window.innerWidth);
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    console.log(data.get('width'));
});


Template.feedBody.moreResults = function() {
    var moreResults = Items.find().count() >= Session.get('itemsLimit');
    return moreResults;
};

Template.feedBody.gridded = function() {
    console.log(data.get('width'));
    return data.get('width') > 1000;

}

Template.feedBody.leftPosts= function() {
    posts = Router.current().data().posts; 
    return _.filter(posts, function(i) {
        return _.indexOf(_.pluck(posts, '_id'), i._id) % 2 == 0;
    });
}

Template.feedBody.rightPosts= function() {
    posts = Router.current().data().posts; 
    return _.filter(posts, function(i) {
        return _.indexOf(_.pluck(posts, '_id'), i._id) % 2 == 1;
    });
}

// infinite scroll
$(window).scroll(function() {
    var threshold, target = $('#showMoreResults');
    if (!target.length) return;
    threshold = $(window).scrollTop() + $(window).height() - target.height();
    if (target.offset().top <= threshold) {
        if (!target.data('visible')) {
            target.data('visible', true);
            Session.set('itemsLimit', Session.get('itemsLimit') + ITEMS_INCREMENT);
            Meteor.subscribe('smartPosts', Session.get('itemsLimit'));
            Meteor.subscribe('smartPosts', {}, 10, Items.findOne({}, {sort: {score:1}}).score);
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
