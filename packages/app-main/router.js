Debug.order('app-main/router.js');

Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [
			Meteor.subscribe('feeds'),
			Meteor.subscribe('userData'),
			Meteor.subscribe('smartNotifs')
		];
	}
});

/*
v
r BeforeHooks = {
	isLoggedIn: function(pause) {
		if (Meteor.isClient && !Meteor.isLoggedIn()) {
			this.redirect('/');
			pause();
		}
	}
};

Router.onBeforeAction(BeforeHooks.isLoggedIn, {only: ['messages', 'message']});
*/


Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'home',
		onRun: Feeds.newRoute.onRun,
		waitOn: function() {
			var subs = [];
			var user = Meteor.user();
			if (Meteor.isClient && user) {
				//subs.push(Meteor.subscribe('conversations', {_id: {$in: user.conversationIds}})); // TODO CHECK WHERE THIS SUBSCRIPTION IS USED
				subs.push(Meteor.subscribe('smartConversations', {_id: {$in: user.conversationIds}}));
			}
			return subs;
		},
		data: function() {
			var data = Feeds.route.data();
			return data;
		},
		onAfterAction: function() {
			document.title = 'Base';
		}
	});

	this.route('feed', {
		path: 'feeds/:id',
		template: 'home',
		onRun: function() {
			return Feeds.newRoute.onRun({'feeds': {$elemMatch: {$in: [this.params.id]}}});
		},
		/*waitOn: function() {
			return Feeds.route.waitOn();
		},*/
		data: function() {
			var data = Feeds.route.data();
			data.feed = Feeds.findOne(this.params.id);
			return data;
		},
		onAfterAction: function() {
			document.title = this.data().feed.name;
		}
	});

	this.route('profile', {
		path: '/profile/:id',
		template: 'profile',
		onRun: function() {
			var filter = {
				sellerId: this.params.id
			}
			return Feeds.newRoute.onRun(filter);
		},
		/*waitOn: function() {
			var filter = {
				sellerId: this.params.id
			};
			var subs = Feeds.route.waitOn(filter);
			return subs;
		},*/
		onAfterAction: function() {
			var user = Meteor.users.findOne({_id: this.params.id});
			if (user) {
				document.title = user.profile.name;
			}
		},
		data: function() {
			var data = Feeds.route.data();
			data.user = Meteor.users.findOne(this.params.id);
			return data;
		}
	});
});



//=================== ROUTES ===================

Router.map(function() {
	this.route('about', {
		path: '/about',
		template: 'about'
	});
	this.route('referral', {
		path: '/referrals',
		template: 'pageReferralCenter'
	});
	this.route('signup', {
		path: '/signup',
		template: 'pageSignup',
		data: function() {
			return {
				refId: this.params.ref
			}
		}
	});
	this.route('fbUpdate', {
		path: '/receive/',
		where: 'server',
		//Meteor.call('fbUpdate', this.params);
		action: function() {
			var filename = this.params.filename;
			this.response.writeHead(200, {
				'Content-Type': 'application/json; charset=utf-8'
			});
			console.log(this.request.body);
			Meteor.call('fbUpdate', JSON.parse(this.request.body.read));
		}

	})
});

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


Router.map(function() {
	this.route('submit', {
		path: '/sell/:step',
		action: function() {
			this.render("pageAddProduct");
			SH[this.params.step].call(this);
		}
	});
	this.route('temp', {
		path: '/temp',
	});
	this.route('itemResults', {
		waitOn: function() {
			return Meteor.subscribe('items', {});
		},
		fastRender: true
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
