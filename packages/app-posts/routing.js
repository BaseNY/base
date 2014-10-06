PostsController = FastRender.RouteController.extend({
	template: 'postPage',
	waitOn: function() {
        console.log('subscribing');
        var subs = [];
        /*
        if (Meteor.isClient) {
		subs.push(Meteor.subscribe('smartPosts', this.params._id, 10));
        }
        return subs;
        */
        return Meteor.subscribe('smartPosts', this.params._id);
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
        title = 'Buy';
        if (post.title) {
            title = post.title;
        }
        SEO.set({
            title: title,
            meta: {
                image: post.imageUrl,
                description: post.description,
            }
            og: {
                title: post.title,
                description: post.description
            }
        });
    }
});

Router.map(function() {
	this.route('posts', {
		path: '/post/:_id',
		controller: PostsController
	});
});
