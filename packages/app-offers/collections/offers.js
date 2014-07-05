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
		type: String
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
	_createOffer: function(item, message) {
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