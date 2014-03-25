Items = new Meteor.Collection('items');
Offers = new Meteor.Collection('offers');
/*
{
    sellerId: -id-
    seller:
    buyerId: -id-
    buyer:
    time: 
    location: -location-
    offer: -moneh-
    postId: -that-
}
*/
Messages = new Meteor.Collection('messages');
/*
 {
    type: (offer message or regular message)
    //1 is an offer, 0 s a regular message
    text: ...
    time: dateObj
    fromId: -id-
    from: -sender name-
    toId: -id-
    to: -receiver name-

    //if offer message
    offerId:
    offer:
    location:
    postId:
    public: 
}
*/
