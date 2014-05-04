Router.configure({
	layoutTemplate: 'layout'
});
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
}

distinct = function(c) {
	var a = [];
	var ai = [];
	for(x in c)
		if(a.indexOf(c[x].seller) < 0) {
			a.push(c[x].seller);
			ai.push(x);
		}
	var b = [];
	for(x in a)
		b.push(c[x]);
	return b;
}

SH = sellHandler();

Router.map(function() {
	this.route('home', {
		path: '/',
                waitOn: function() {
                    Meteor.subscribe('ftoi', Session.get('ftoiLimit')); },
                cache: 10,
                expire:2 });
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
                Meteor.subscribe('ftoi', Session.get('ftoiLimit'), '@'+this.params.id);
            },
            data: function() {
                return {
                    user: Meteor.users.findOne({_id:this.params.id})
                }
            }
        });
	this.route('posts', {
		path: '/post/:id',
                waitOn: function() {
                },
		action: function() {
			this.render("pageProduct");
		},
		data: function() {
			var item = Items.findOne({_id:this.params.id});
			return {
				item:item,
		                seller:Meteor.users.findOne({_id:item.sellerId}),
			}
			/*
			   return {
			   title: item.title,
			   category: item.category,
			   so: item.so,
			   bin: item.bin,
			   condition: item.condition,
			   description: item.description,

			}
		}
	});
	this.route('itemResults', {
		waitOn: function() {
			return Meteor.subscribe('items');
		},
		fastRender: true
	});
			   }
			   */
		}
	});
	this.route('itemResults', {
		waitOn: function() {
			return Meteor.subscribe('items');
		},
		fastRender: true
	});
	this.route('about', {
		path: '/about',
		action: function() {
			this.render("pageAbout");
		},
	});
	this.route('inbox', {
		path: '/inbox',
		action: function() {
			this.render('pageItemInbox');
		},
	});
this.route('feeds', {
    path: '/feeds/:id',
    template: 'home',
    waitOn: function() {
        return Meteor.subscribe('ftoi', Session.get('ftoiLimit'), this.params.id);
    },
    data: function() {
        var feed = Feeds.findOne({_id: this.params.id});
        return {
            'feed': feed,
        }
    }
});
	this.route('offers', {
		path: '/inbox/:id',
                waitOn: function() {
                    
                },
		action: function() {
			this.render('pageOffers');
		},
		data: function() {
			var offers = distinct(Offers.find({postId:this.params.id}).fetch());

			var item = Items.findOne({_id:this.params.id});
			return {
				item:item,
				offers:offers
			}
		}
	});
	this.route('offers', {
		path: '/inbox/:id/:pid',
		action: function() {
			this.render('pageNego');
		},
		data: function() {
			var offers = Offers.find({postId:this.params.id}).fetch();
			var item = Items.findOne({_id:this.params.id});
			//add a sort for time
			var messages = Messages.find({postId: this.params.id},{sort:{time:1}}).fetch();
			return {
			  item: item,
			  offers: offers,
			  messages: messages
			}
		}
	});
});

Router.map(function() {
	this.route('demo', {
		path: '/demo',
		template: 'demo'
	});
});

Router.map(function() {
	this.route('search', {
		action: function() {
			//console.log(this);
			console.log(this.response);
			//console.log(this.router);
			var query = this.params.q;
			var self = this;
			Meteor.call('searchItem', query, function(err, data) {
				Session.set('sResults',data)
				self.render('search');
			});
		},
	});
});
