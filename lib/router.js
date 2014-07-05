var preloadSubscriptions = ['feeds', 'userData', 'allUserData'];

Router.configure({
    layoutTemplate: 'layout',
    waitOn: function() {
        Meteor.subscribe('notifs');
        return _.map(preloadSubscriptions, function(sub) {
            Meteor.subscribe(sub);
        });
    }
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
    var filter = {};
    if (Session.get('degrees')) {
        if (Session.get('sellOn')) {
            filter = {
                $or: [{buy: {$exists: false}}, {buy: {$exists: Session.get('buyOn')}}],
               fbId: {$in: Meteor.user().profile.friends}
            }
        } else if (Session.get('buyOn')) {
            filter = {buy: true, fbId: {$in: Meteor.user().profile.friends}};
        } else {
            filter = {_id: null};
        }
    } else {
        if (Session.get('sellOn')) {
            filter = {
                $or: [{buy: {$exists: false}}, {buy: {$exists: Session.get('buyOn')}}]
            }
        } else if (Session.get('buyOn')) {
            filter = {buy: true};
        } else {
            filter = {_id: null};
        }
    }

    subs.push(Meteor.subscribe('items', filter, {sort: {score: -1}, limit: 100}));
}
if (Meteor.isLoggedIn()) {
    subs.push(Meteor.subscribe('conversations', {_id: {$in: Meteor.user().conversationIds}}));
}
return subs;
}
});

//=================== ROUTES ===================

Router.map(function() {
    this.route('home', {
        path: '/',
        controller: HomeController
    });

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
    this.route('profile', {
        path: '/profile/:id',
        waitOn: function() {
            var filter = '';
            if (Session.get('buyOn') && !Session.get('sellOn')) {
                filter = {
                    sellerId: this.params.id,
        buy: true
                };
            } else if (Session.get('sellOn') && !Session.get('buyOn')) {
                filter = {
                    sellerId: this.params.id,
        $or: [{
            buy: {
                $exists: false
            }
        }, {
            buy: true
        }]
                };
            } else {
                filter = {
                    sellerId: this.params.id
                };
            }

            return Meteor.subscribe('items', filter, {
                sort: {
                    score: -1
                },
                   limit: Session.get('ftoiLimit')
            });
        },
        data: function() {
            return {
                user: Meteor.users.findOne({
                    _id: this.params.id
                })
            };
        }
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
