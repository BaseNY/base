(function() {
	Router.configure({
		layoutTemplate: 'layout'
	});

	//=================== CONTROLLERS ===================

	HomeController = FastRender.RouteController.extend({
		template: 'home',
		waitOn: function() {
			var subs = [
				Meteor.subscribe('feeds')
			];
			// have to check if Meteor.isClient because of Session
			if (Meteor.isClient) {
                              return Meteor.subscribe('items', {}, {sort: {score: -1}, limit: Session.get('ftoiLimit')});
			}
			return subs;
		}/*,
		data: function() {
			var feeds = Feeds.find().fetch();
			var posts = FtoI.find();
			return {
				feeds: feeds,
				posts: posts
			};
		}*/
	});

	InboxController = FastRender.RouteController.extend({
		template: 'inbox',
		waitOn: function() {
			var id = Meteor.userId();
			return [
				Meteor.subscribe('items', {sellerId: id}),
				Meteor.subscribe('offers', {buyerId: id})
			];
		},
		data: function() {
			var id = Meteor.userId();
			var items = Items.find({sellerId: id});
			var offers = Offers.find({buyerId: id}); // buying offers

			return {
				user: Meteor.user().profile.name,
				items: items,
				offers: offers
			};
		}
	});

	MessagesController = FastRender.RouteController.extend({
		template: 'messages',
		waitOn: function() {
			var id = Meteor.userId();
			return [
				Meteor.subscribe('items'),
				Meteor.subscribe('offers', {
					$or: [
						{buyerId: id},
						{sellerId: id}
					]
				}),
				Meteor.subscribe('messages', {
					offerId: this.params.offerId
				})
			];
		},
		data: function() {
			var offer = Offers.findOne({_id: this.params.offerId});
			var offers = Offers.find({itemId: offer.itemId});
			var item = Items.findOne({_id: offer.itemId});
			var messages = Messages.find({offerId: this.params.offerId}, {sort: {time: 1}});
			return {
				offerId: this.params.offerId,
				offers: offers,
				item: item,
				messages: messages
			};
		}
	});

	//=================== ROUTES ===================

	Router.map(function() {
		this.route('home', {
			path: '/',
			controller: HomeController
		});

		this.route('inbox', {
			path: '/inbox',
			controller: InboxController
		});

		this.route('messages', {
			path: '/inbox/:offerId',
			controller: MessagesController
		});

		this.route('about', {
			path: '/about',
			template: 'about'
		});
	});
})();

var sellHandler = function() {
	function rendTitle() {
		this.render('addTitle', {
			to: 'sellYield'
		});
	}

	function rendInfo() {
		this.render('addInfo', {
			to: 'sellYield'
		});
	}

	function rendPre() {
		this.render('postPreview', {
			to: 'sellYield'
		});
	}
	return {
		title: rendTitle,
		info: rendInfo,
		preview: rendPre
	};
};

distinct = function(c) {
	var a = [];
	var ai = [];
	for (var x in c) {
		if (a.indexOf(c[x].seller) < 0) {
			a.push(c[x].seller);
			ai.push(x);
		}
	}
	var b = [];
	for (var x in a) {
		b.push(c[x]);
	}
	return b;
};

SH = sellHandler();

Router.map(function() {
	this.route('submit', {
		path: '/sell/:step',
		action: function() {
			this.render("pageAddProduct");
			SH[this.params.step].call(this);
		}
	});
	this.route('profile', {
		path: '/profile/:id',
		waitOn: function() {
                            return Meteor.subscribe('items', {sellerId: this.params.id}, {sort: {score: -1}, limit: Session.get('ftoiLimit')});
		},
		data: function() {
			return {
				user: Meteor.users.findOne({
					_id: this.params.id
				})
			};
		}
	});
	this.route('posts', {
		path: '/post/:id',
		action: function() {
			this.render("pageProduct");
		},
		data: function() {
			var item = Items.findOne({
				_id: this.params.id
			});
			return {
				item: item,
				seller: Meteor.users.findOne({
					_id: item.sellerId
				}),
			};
			/*
			return {
				title: item.title,
				category: item.category,
				so: item.so,
				bin: item.bin,
				condition: item.condition,
				description: item.description,
			}*/
		}
	});
	this.route('itemResults', {
		waitOn: function() {
			return Meteor.subscribe('items', {});
		},
		fastRender: true
	});

	this.route('feeds', {
		path: '/feeds/:id',
		template: 'home',
		waitOn: function() {
                            return Meteor.subscribe('items', {_id: {$in: Feed.findOne({_id: this.params.id}).items}}, {sort: {score: -1}, limit: Session.get('ftoiLimit')});
		},
		data: function() {
			var feed = Feeds.findOne({
				_id: this.params.id
			});
			return {
				'feed': feed,
			};
		}
	});

	this.route('search', {
		action: function() {
			//console.log(this);
			console.log(this.response);
			//console.log(this.router);
			var query = this.params.q;
			var self = this;
			Meteor.call('searchItem', query, function(err, data) {
				Session.set('sResults', data);
				self.render('search');
			});
		},
	});
});
