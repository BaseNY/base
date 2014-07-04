PostsController = FastRender.RouteController.extend({
	template: 'postPage',
	waitOn: function() {
		return Meteor.subscribe('items', this.params._id);
	},
	data: function() {
		var item = Items.findOne(this.params.id);
		return {
			item: item,
			seller: Meteor.users.findOne(item.sellerId)
		};
	}
});

Router.map(function() {
	this.route('posts', {
		path: '/post/:_id',
		controller: PostsController
	});
});