Router.configure({
	layoutTemplate: 'layout'
});

var sellHandler = function() {
	function rendTitle() {
		this.render('addTitle', {
			to: 'sellYield'
		});
	}
	function rendCat() {
		this.render('addCategory', {
			to: 'sellYield'
		});
	}
	function rendPrice() {
		this.render('addPricing', {
			to: 'sellYield'
		});
	}
	function rendCond() {
		this.render('addCondition', {
			to: 'sellYield'
		});
	}
	function rendDesc() {
		this.render('addDescription', {
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
		category: rendCat,
		price: rendPrice,
		condition: rendCond,
		describe: rendDesc,
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
});

Router.map(function() {
	this.route('demo', {
		path: '/demo',
		template: 'demo'
	});
});
