Template.product.events({
	'click #product-bid': function() {
		$('#modal-container').css('display', 'block');
		$('#modal-bid').css('display', 'block');
	}
});

Template.pageItemInbox.user = function() {
	return Meteor.user().profile.name;
}

Template.pageItemInbox.items = function() {
	return Items.find({
		sellerId: Meteor.userId()
	}).fetch();
}

Template.itemsRow.helpers({
	offers: function() {
		return Offers.find({
			sellerId: Meteor.userId(),
			postId: this._id
		}).fetch();
	}
});


Template.itemsRow.test = function(e) {
	return e;
}

Template.bidding.sendMsg = function(i, m) {
	m.type = 1;
	m.text = $('#message').val();
	m.postId = i._id;
	console.log(this);
	m.public = false;
	Meteor.call('addBid', m, function(e, r) {
		if (e)
			alert(e);
		else {
			if (r == -1)
				alert('error!');
			else
				alert('youre message has been sent');
		}
	});
}

Template.bidding.events({
	'click #sendMsg': function() {
		var itemObj = Router.current().data();
		if (itemObj == null)
			itemObj = Items.findOne({
				_id: this.itemId
			});
		/*
		if (itemObj.seller._id == Meteor.userId()) {
			alert('You cannot bid for your own item!');
		}
		*/

		var msg = {};


		msg.toId = itemObj.sellerId;
		msg.to = itemObj.seller;

		/*
		msg.offer=$('#offer').val();
		msg.location = $('#location').val();
		*/
		Template.bidding.sendMsg(itemObj, msg);
	}
});

Template.pageNego.events({
	'click #sendMsg': function() {
		var itemObj = Router.current().data();
		var msg = {};

		if (itemObj.item.sellerId == Meteor.userId()) {
			msg.toId = itemObj.messages[0].fromId;
			msg.to = itemObj.messages[0].from;
		} else {
			msg.toId = itemObj.item.sellerId;
			msg.to = itemObj.item.seller;
		}
		Template.bidding.sendMsg(itemObj, msg);
	}
});

Template.message.img = function() {
	var fbId = Meteor.users.findOne({
		_id: "Ztg5NuWnTrzsBM8Qu"
	}).services.facebook.id;
	return $.getJSON("https://graph.facebook.com/" + fbId + "?fields=picture.width(100).height(100)").responseJSON;
}

Template.message.text = function() {
	return new Handlebars.SafeString(this.text);
}
