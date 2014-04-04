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

SH = sellHandler();

Router.map(function() {
	this.route('home', {
		path: '/'
	});
	this.route('submit', {
		path: '/sell/:step',
		action: function() {
			this.render("pageAddProduct");
			SH[this.params.step].call(this);
		}
	});
	this.route('posts', {
		path: '/post/:id',
		action: function() {
			this.render("product");
		},
		data: function() {
			var item = Items.findOne({_id:this.params.id});
			return {
				item:item,
		seller:Meteor.users.findOne({_id:item.sellerId})
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
    this.route('messenger',{
	action:function(){
	    this.render("messenger");
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
    this.route('offers', {
        path: '/inbox/:id',
        action: function() {
            this.render('pageOffers');
        },
        data: function() {
            var offers = Offers.find({postId:this.params.id}).fetch();
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
                item:item,
                offers:offers,
                messages:messages 
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
