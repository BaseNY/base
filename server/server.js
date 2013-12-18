if (Meteor.isServer) {
    OpenProduct = new Meteor.Collection("open");
    ClosedProduct = new Meteor.Collection("closed");

    Meteor.methods({
	addProduct: function(p) {
	    p.user = this.userId;
	    p.time = new Date();
	    OpenProduct.insert(p);
	}
    });
}
