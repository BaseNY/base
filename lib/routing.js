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
		path: '/',
		template: 'home'

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
});

Router.map(function() {
	this.route('demo', {
		path: '/demo',
		template: 'demo'
	});
});
