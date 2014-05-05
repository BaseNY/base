defaultFeeds = [];
if (Feeds.findOne() == undefined) {
	console.log(defaultFeeds);
	defaultFeeds.push(Feeds.insert({
		name: 'Sneakers',
		icon: 'money'
	}));
	defaultFeeds.push(Feeds.insert({
		name: 'Electronics',
		icon: 'laptop'
	}));
	defaultFeeds.push(Feeds.insert({
		name: 'Clothing (Men)',
		icon: 'male'
	}));
	defaultFeeds.push(Feeds.insert({
		name: 'Clothing (Women)',
		icon: 'female'
	}));
	defaultFeeds.push(Feeds.insert({
		name: 'Books',
		icon: 'book'
	}));
	defaultFeeds.push(Feeds.insert({
		name: 'Others',
		icon: 'random'
	}));
	console.log(defaultFeeds);
}
Meteor.methods({
	addPost: function(p) {
		console.log('called');
		p.sellerId = this.userId;
		p.seller = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.name;
		p.sold = false;
		p.time = new Date();
		p.score = p.time.getTime();
		//p.imageUrl = s3ImageUpload(this.userId, p.image);
		var temp = Items.insert(p);
		//	if (p.imageUrl == null)
		//		return -1;
		if (p.title == null)
			return -2;
		else if (p.description == null)
			return -3;
		else if (p.feeds == null)
			return -4;
		/*
		es.create({
			index: 'base',
			type: 'item',
			body: {
				name: p.title,
				desc: p.description,
				image: p.imageUrl
			}
		});
		*/
		console.log(temp);
		//linker. pushes the id of the item, and the id of the category
		for (x in p.feeds)
			FtoI.insert({
				'feedId': p.feeds[x],
				'itemId': temp,
				'sellerId': p.sellerId,
				'score': p.score
			});
		return temp;
	},
	addRequest: function(p) {
		p.sellerId = this.userId;
		p.seller = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.name;
		p.time = new Date();
		p.score = p.time.getTime();
		var temp = Items.insert(p);
		for (x in p.feeds) {
			FtoI.insert({
				'feedId': p.feeds[x],
				'itemId': temp,
				'sellerId': p.sellerId,
				'score': p.score
			});
		}
	},
	// creates offer and first message
	createOffer: function(item, message) {
		var offerDoc = Offers.findOne({
			itemId: item._id,
			buyerId: Meteor.userId()
		});

		var offerId;
		if (offerDoc) {
			offerId = offerDoc._id;
		} else {
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

		message.offerId = offerId;
		Meteor.call('sendMessage', message);
		return offerId;
	},
	sendMessage: function(data) {
		var message = {
			time: new Date(),
			type: 1,
			isPublic: false,
			offerId: data.offerId,
			text: data.text,
			posterId: Meteor.userId(),
			poster: Meteor.user().profile.name
		};
		return Messages.insert(message);
	},
	addComment: function(t, id) {
		item = Items.findOne({
			_id: id
		});
		comments = item.comments;
		if (comments == undefined)
			comments = [];
		url = Meteor.users.findOne({
			_id: this.userId
		}).profile.img;
		toAdd = [this.userId, t, url, new Date()];
		comments.push(toAdd);
		console.log(comments);
		if (!this.userId)
			return -1;
		Items.update({
			_id: id
		}, {
			$set: {
				comments: comments
			}
		});
		var ret = FtoI.update({
			itemId: id,
			feedId: item.feeds[0]
		}, {
			$set: {
				score: toAdd[3].getTime()
			}
		});
		console.log(ret);
		return toAdd;
	},
	clearMessages: function() {
		return Meteor.users.update({
			_id: Meteor.userId()
		}, {
			$set: {
				new_message: 0
			}
		});
	},
	updateLast: function() {
		var temp = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile;
		temp.last_online = new Date();
		Meteor.users.update({
			_id: Meteor.userId()
		}, {
			profile: temp
		});
	},
	/*
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
	resetFeeds: function() {
		FtoI.remove({});
		Feeds.remove({});
	},
		*/
	markSold: function(item) {
		Items.update({
			_id: item._id
		}, {
			$set: {
				sold: true
			}
		});
	}
});
