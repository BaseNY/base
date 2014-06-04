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

Meteor.methods({
	// creates offer and first message
	'createOffer': function(item, message) {
		if (!message) {
			throw new Meteor.error(600, "Invalid message");
		} else if (!message.text) {
			throw new Meteor.error(601, "Message cannot be empty");
		}
		if (!item) {
			throw new Meteor.error(602, "Invalid item");
		}

		// see if offer already exists
		var offerDoc = Offers.findOne({
			itemId: item._id,
			buyerId: Meteor.userId()
		});
		var offerId;

		// if offer exists just return the id
		if (offerDoc) {
			offerId = offerDoc._id;
		}
		// if offer doesn't exist, create a new offer
		else {
			var offer = {
				time: new Date(),
				itemId: item._id,
				sellerId: item.sellerId,
				seller: item.seller,
				buyerId: Meteor.userId(),
				buyer: Meteor.user().profile.name
				//,location: message.location
				//,offer: message.offer
			};
			offerId = Offers.insert(offer);
		}																																																																																																																																																																																													

		// create the message
		message.offerId = offerId;
		Meteor.call('createMessage', message);

		return offerId;
	}
});
