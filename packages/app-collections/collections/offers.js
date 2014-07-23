Debug.order('app-collections/collections/offers.js');

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
	createdAt: Schemas.defaults.createdAt,
	itemId: { // TODO change from itemId to postId
		type: String
	},
	buyerId: {
		type: String
	},
	buyer: {
		type: String,
		autoValue: function() {
			var sellerId = this.field('buyerId').value;
			return Schemas.autoValue.insert(this, function() {
				return Users.findOne(sellerId).profile.name;
			});
		}
	},
	sellerId: {
		type: String,
		autoValue: function() {
			var itemId = this.field('itemId').value;
			return Schemas.autoValue.insert(this, function() {
				return Posts.findOne(itemId).sellerId;
			});
		}
	},
	seller: {
		type: String,
		autoValue: function() {
			var sellerId = this.field('sellerId').value;
			return Schemas.autoValue.insert(this, function() {
				return Users.findOne(sellerId).profile.name;
			});
		}
	}
});

Offers = new Meteor.Collection('offers');

Offers.attachSchema(Schemas.Offer);

Offers.allow({
	insert: function(userId, doc) {
		return userId && (userId === doc.buyerId || Roles.userIsInRole(userId, 'admin'));
	},
	update: function(userId, doc, fields, modifier) {
		return userId && (userId === doc.buyerId || Roles.userIsInRole(userId, 'admin'));
	},
	remove: function(userId, doc) {
		return userId && (userId === doc.buyerId || Roles.userIsInRole(userId, 'admin'));
	}
});

// TODO remove buyer and seller fields and just use this
Offers.helpers({
	sellerName: function() {
		return Users.findOne(this.sellerId).profile.name;
	},
	buyerName: function() {
		return Users.findOne(this.buyerId).profile.name;
	}
});

Offers.create = function(post, callback) {
	return Meteor.call('_createOffer', post, callback);
};

Meteor.methodsRequireLogin({
	_createOffer: function(post) {
		var doc = {
			itemId: post._id,
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
		if (!message) {
			throw new Meteor.Error(600, "Invalid message");
		}
		if (!post) {
			throw new Meteor.Error(602, "Invalid post");
		}

		var doc = {
			itemId: post._id,
			buyerId: this.userId
		};
		var offer = Offers.findOne(doc);

		doc.sellerId = post.sellerId;
		doc.seller = post.seller;

		doc.createdAt = new Date();
		console.log(doc);
		if (!offer) {
			offer = Offers.insert(doc);
		} else {
			Debug.offers('Offer exists');
			offer = offer._id;
		}

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
/*
Offers.create = function(post, message, type, callback) {
	return Meteor.call('_createOffer', post, message, type, callback);
};*/
