if (Meteor.isServer) {
	Meteor.methods({
		addProduct: function(p) {
			console.log('called');
			p.sellerId = this.userId;
                        p.seller = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
			p.time = new Date();
			var temp = Items.insert(p);
			console.log(Items);
			return temp;
		},
                addBid: function(p) {
                    console.log('called' + p);
                    p.buyerId = this.userId;
                    p.buyer = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
                    
                    /*
                    if(p.buyer == p.seller) {
                        return -1;
                    }
                    */
                    return Offers.insert(p);
                },
                resetAccounts: function() {
                    Meteor.users.remove({});
                    console.log(Meteor.users.find().fetch());
                },
                resetItems: function() {
                    Items.remove({});
                },
                resetMsg: function() {
                    Offers.remove({}); 
                },
	})
}
