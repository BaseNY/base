Router.map(function() {
	this.route('posts', {
		path: '/post/:id',
		action: function() {
			this.render("pageProduct");
		},
		data: function() {
			var item = Items.findOne({
				_id: this.params.id
			});
			return {
				item: item,
				seller: Meteor.users.findOne({
					_id: item.sellerId
				}),
			};
		}
	});
});