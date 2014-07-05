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
Offers = new Meteor.Collection('offers');

Offers.before.insert(function(userId, doc) {
	if (Meteor.isClient && !Meteor.isLoggedIn()) {
		throw new Meteor.Error(403, "Access denied: not logged in");
	}

	doc.createdAt = new Date();
	var offer = Offers.findOne({
		itemId: item._id,
		buyerId: userId,
		buyer: Meteor.users.find(userId).profile.name
	});
});

Meteor.methods({
	_createOffer: function(item, message) {
		if (!message) {
			throw new Meteor.error(600, "Invalid message");
		}
		if (!item) {
			throw new Meteor.error(602, "Invalid item");
		}

		var doc = {
			itemId: item._id,
			buyerId: this.userId
		}
		var offer = Offers.findOne({itemId});

		doc.sellerId = item.sellerId;
		doc.seller = item.seller;
		doc.buyer = Meteor.users.findOne(this.userId).profile.name

		if (!offer) {
			offer = Offers.insert(doc);
		} else {
			Debug.offers('Offer exists');
			offer = offer._id;
		}

		Meteor.call('_sendMessage', message, doc.sellerId);

		return offer;
	}
});

Offers.create = function(item, message, callback) {
	return Meteor.call('_createOffer', item, message, callback);
};