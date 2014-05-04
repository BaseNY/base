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
	})); defaultFeeds.push(Feeds.insert({
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
		p.time = new Date();
		//p.imageUrl = s3ImageUpload(this.userId, p.image);
		var temp = Items.insert(p);
                if(p.imageUrl == null)
                    return -1;
                else if (p.title == null)
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
                                'time': p.time
			});
		return temp;
	},
	addRequest: function(p) {
		p.sellerId = this.userId;
		p.seller = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.name;
		p.time = new Date();
		var temp = Items.insert(p);
		for (x in p.feeds)
			FtoI.insert({
				'feedId': p.feeds[x],
				'itemId': temp,
                                'time': p.time
			});
	},
	addBid: function(p) {
		console.log('called' + p);
		p.fromId = Meteor.userId();
		p.from = Meteor.users.findOne({
			_id: Meteor.userId()
		}).profile.name;
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
	addComment: function(t, id) {
		comments = Items.findOne({
			_id: id
		}).comments;
		if (comments == undefined)
			comments = [];
		toAdd = [this.userId, t, new Date()];
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
		return toAdd;
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
	resetFeeds: function() {
		FtoI.remove({});
		Feeds.remove({});
	}
});
