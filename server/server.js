if (Meteor.isServer) {
            Feeds.remove({});
            Feeds.insert({name:'Electronics'});
            Feeds.insert({name:'Clothing'});
            Feeds.insert({name:'Sneakers'});

	Meteor.methods({
		addProduct: function(p) {
			console.log('called');
			p.sellerId = this.userId;
                        p.seller = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
			p.time = new Date();
			var temp = Items.insert(p);
                        console.log(temp);
                        //linker. pushes the id of the item, and the id of the category
                        for(x in p.feeds)
                            FtoI.insert({'feedId': p.feeds[x], 'itemId': temp});
			return temp;
		},
                addBid: function(p) {
                    console.log('called' + p);
                p.fromId = Meteor.userId();
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
