PostsController = FastRender.RouteController.extend({
	template: 'postPage',
	onRun: function() {
        console.log('subscribing');
        var subs = [];
        if (Meteor.isClient) {
		subs.push(Meteor.subscribe('smartPosts', this.params._id, 10));
        }
        return subs;
	},
	data: function() {
		var item = Items.findOne(this.params._id);
		return {
			item: item,
			seller: Meteor.users.findOne(item.sellerId)
		};
	},
    onAfterAction: function() {
        if(!Meteor.isClient)
            return;

        post = Items.findOne(this.params._id);

        /*
        SEO.set({
            title:post.title,
            meta: {
                'description': post.description
            },
            og: {
                'title': post.title,
                'description': post.description,
                'image':post.imageUrl
            }
        });
        */
        $('meta[property="og:image"]').attr('content',post.imageUrl);
        $('meta[property="og:description"]').attr('content',post.description);
        $('meta[property="og:title"]').attr('content',post.title);
        $('meta[property="description"]').attr('content',post.description);
        if (post.title) {
        	document.title = post.title;
        }
    }
});

Router.map(function() {
	this.route('posts', {
		path: '/post/:_id',
		controller: PostsController
	});
});
