Debug.order('app-collections/collections/offers.js');

Schemas.Offer = new SimpleSchema({
	createdAt: Schemas.defaults.createdAt,
	postId: {
		type: String
	},
	buyerId: {
		type: String
	},
	sellerId: {
		type: String,
		autoValue: function() {
			var postId = this.field('postId').value;
			return Schemas.autoValue.insert(this, function() {
				return Posts.findOne(postId).userId;
			});
		}
	}
});

Offers = new Meteor.Collection('offers');

Offers.attachSchema(Schemas.Offer);

Offers.allowAll(function(userId, doc) {
	return userId && (userId === doc.buyerId || Roles.userIsInRole(userId, 'admin'));
});

Offers.helpers({
	sellerName: function() {
		return Users.findOne(this.sellerId).profile.name;
	},
	buyerName: function() {
		return Users.findOne(this.buyerId).profile.name;
	}
});

Offers.create = Utils.forwardMeteorMethod('_createOffer');

// ======================= SERVER =======================

Meteor.methodsRequireLogin({
	_createOffer: function(post) {
		var doc = {
			postId: post._id,
			buyerId: this.userId
		};
		var offer = Offers.findOne(doc);
		if (offer) {
			throw new Meteor.Error(600, "Offer already exists", 'Offer _id: ' + offer._id);
		}
		return Offers.insert(doc);
	}
});

/*Meteor.methods({
	_createOffer: function(post, message, type) {
		myName = Meteor.user().profile.name;
		var conv = Conversations.findOne({
			offerId: offer,
			'users._id': doc.buyerId
		});
		if (conv) {
			Messages.create(message, conv._id, type);
		} else {
			conv = Meteor.call('_createConversation', [doc.sellerId, doc.buyerId], offer, function(e, r) {
				Messages.create(message, r, type);
				if (Meteor.isServer) {
					var email = Meteor.users.findOne({
						_id: post.sellerId
					}).profile.email;
					Email.sendEmail(email, 'You have received an offer for your posting: ' + post.title, myName + ' has given you an offer for your posting. Respond to him at http://base.us/messages/' + r);
				}
			});
		}
		return offer;
	}
});*/
