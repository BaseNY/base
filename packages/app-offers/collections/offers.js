/* Offer
   {
   createdAt:
   itemId:
   sellerId:
   seller:
   buyerId:
   buyer:
//location:
//offer:
}
*/
Schemas.Offer = new SimpleSchema({
    createdAt: {
        type: Date
    },
itemId: {
    type: String
},
sellerId: {
    type: String
},
seller: {
    type: String
},
buyerId: {
    type: String
},
buyer: {
    type: String,
optional: true
}
});

Offers = new Meteor.Collection('offers');

Offers.before.insert(function(userId, doc) {
    if (Meteor.isClient && !Meteor.isLoggedIn()) {
        throw new Meteor.Error(403, "Access denied: not logged in");
    }

    _.extend(doc, {
        createdAt: new Date(),
        buyerId: userId,
        buyer: Meteor.users.findOne(userId).profile.name
    });

    Debug.offers('Before insert', doc);

    //check(doc, Schemas.Offer);
});

Meteor.methods({
    _createOffer: function(item, message, type) {
        if (!message) {
            throw new Meteor.Error(600, "Invalid message");
        }
        if (!item) {
            throw new Meteor.Error(602, "Invalid item");
        }

        var doc = {
            itemId: item._id,
    buyerId: this.userId
        };
        var offer = Offers.findOne(doc);

        doc.sellerId = item.sellerId;
        doc.seller = item.seller;

        doc.createdAt = new Date(); 
        console.log(doc);
        if (!offer) {
            offer = Offers.insert(doc);
        } else {
            Debug.offers('Offer exists');
            offer = offer._id;
        }

        myName = Meteor.user().profile.name;
        var conv = Conversations.findOne({offerId: offer, 'users._id': doc.buyerId});
        if (conv) {
            Messages.create(message, conv._id, type);
        } else {
            conv = Meteor.call('_createConversation', [doc.sellerId, doc.buyerId], offer, function(e,r){
                Messages.create(message, r, type);
                if(Meteor.isServer) {
                    var email = Meteor.users.findOne({_id: item.sellerId}).profile.email;
                    sendEmail(email,'You have received an offer for your posting: ' + item.title, myName + ' has given you an offer for your posting. Respond to him at http://base.us/messages/' + r);
                }
            });
        }

        return offer;
    }
});

Offers.create = function(item, message, type, callback) {
    return Meteor.call('_createOffer', item, message, type, callback);
};
