Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [
			Meteor.subscribe('feeds'),
			Meteor.subscribe('notifs'),
			Meteor.subscribe('userData'),
			Meteor.subscribe('allUserData')
		];
	}
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
	/*
	   this.route('signup', {
	   path: '/signup',
	   template: 'pageSignup',
	   });
	   */
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
