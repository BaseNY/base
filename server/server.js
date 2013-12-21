if (Meteor.isServer) {
    Items = new Meteor.Collection("items");
    Meteor.publish('items', function() {
	return Items.find({});
    });

    Meteor.methods({
	addProduct: function(p) {
	    p.user = this.userId;
	    p.time = new Date();
	    Items.insert(p);
	    console.log(Items);
	}
    });
}
