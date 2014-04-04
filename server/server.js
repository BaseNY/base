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
                    p.fromId = this.userId;
                    p.from = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
                    p.time = new Date(); 
                    
                    var offer = {
                        sellerId: p.toId,
                        seller: p.to,
                        buyerId: p.fromId,
                        buyer: p.from,
                        time: p.time,
                        location: p.location,
                        offer: p.offer,
                        postId: p.postId
                    };

                    var oId = Offers.insert(offer);
                    p.offerId = oId;

                    /*
                    if(p.buyer == p.seller) {
                        return -1;
                    }
                    */
                    return Messages.insert(p);
                },
                resetAccounts: function() {
                    Meteor.users.remove({});
                    console.log(Meteor.users.find().fetch());
                },
                resetItems: function() {
                    Items.remove({});
                },
                resetMsg: function() {
                    Messages.remove({});
                    Offers.remove({}); 
                },
	})
}
