if (Meteor.isServer) {
	Meteor.methods({
		addProduct: function(p) {
			console.log('called');
			p.user = this.userId;
			p.time = new Date();
			var temp = Items.insert(p);
			console.log(Items);
			return temp;
		}
	})
}
