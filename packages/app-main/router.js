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
		waitOn: function() {
			var subs = [];
			var user = Meteor.user();
			if (Meteor.isClient && user) {
				//subs.push(Meteor.subscribe('conversations', {_id: {$in: user.conversationIds}})); // TODO CHECK WHERE THIS SUBSCRIPTION IS USED
				subs.push(Meteor.subscribe('smartConversations', {_id: {$in: user.conversationIds}}));
                                subs.push(Feeds.newRoute.onRun());
			}
			return subs;
		},
		data: function() {
			var data = Feeds.route.data();
			return data;
		},
	});

	this.route('feed', {
		path: 'feeds/:id',
		template: 'home',
		waitOn: function() {
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
                        SEO.set({
                            title: this.data().feed.name,
                            og: {
                                title: this.data().feed.name,
                            }
                        });
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
                            SEO.set({
                                title: user.profile.name,
                                meta: {
                                    image: user.profile.img
                                },
                                og: {
                                title: user.profile.name,
                                    image: user.profile.img
                                }
                            });
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
		template: 'pageReferralCenter',
                onAfterAction: function() {
                    SEO.set({
                        title: 'Referral Center',
                        og: {
                            title: 'Referral Center',
                        }
                    });
                }
	});
	this.route('signup', {
		path: '/signup',
		template: 'pageSignup',
		data: function() {
			return {
				refId: this.params.ref
			}
		},
                onAfterAction: function() {
                    SEO.set({
                        title: 'Signup'
                        og: {
                            title: 'Signup'
                        }
                    });

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
