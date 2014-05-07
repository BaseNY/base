Items = new Meteor.Collection('items');

/* Offer
{
	time:
	itemId:
	sellerId:
	seller:
	buyerId:
	buyer:
	//location:
	//offer:
}
*/
Offers = new Meteor.Collection('offers');

/* Message
{
	time:
	posterId:
	poster:
	offerId:
	text:
	type: - 1 is an offer, 0 is a regular message -
	isPublic:
}
*/
Messages = new Meteor.Collection('messages');

Feeds = new Meteor.Collection('feeds');

FtoI = new Meteor.Collection('ftoi');
/*
 * acts as an intermediary between feeds and items
{
    _id: id of the intermediary
    _feedId: id of the feed
    _itemId: id of the item
}
*/
