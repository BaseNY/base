if (Meteor.isServer) {
    Items = new Meteor.Collection("items");
    Meteor.publish('items', function() {
	return Items.find({});
    });

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
