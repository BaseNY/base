Template.product.events({
	'click #product-bid': function() {
		$('#modal-container').css('display', 'block');
		$('#modal-bid').css('display', 'block');
	}
});

Template.itemsRow.events({
	'click #mark-sold': function(e) {
		Meteor.call('markSold', this, function(e) {
			if (e) {
				console.log(e);
			}
		});
	}
})

Template.itemsRow.helpers({
	offers: function() {
		return Offers.find({
			itemId: this._id
		}).fetch();
	}
});

Template.itemsRow.test = function(e) {
	return e;
}

Template.bidding.events({
	'click #sendMsg': function() {
		var item = Items.findOne({
			_id: this.itemId
		});
		console.log("bidding item:");
		console.log(item);
		console.log();

		var msg = {
			text: $('#message').val(),
			type: 1,
			isPublic: false,
			posterId: Meteor.userId(),
			poster: Meteor.user().profile.name
		};

		Meteor.call("createOffer", item, msg, function(err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log(data);
				alert('your message has been sent');
			}
		});

		/*
		if (item.seller._id == Meteor.userId()) {
			alert('You cannot bid for your own item!');
		}
		*/
		/*
		msg.offer=$('#offer').val();
		msg.location = $('#location').val();
		*/
	}
});

Template.pageNego.events({
	'keydown #message': function(e) {
		var $message = $("#message");
		if (e.which === 13) {
			e.preventDefault();
			if ($message.val()) {
				var data = Router.current().data();

				var msg = {
					text: $message.val(),
					type: 1,
					isPublic: false,
					offerId: data.offerId,
					posterId: Meteor.userId(),
					poster: Meteor.user().profile.name
				};

				Meteor.call("sendMessage", msg, function(err) {
					if (err) {
						console.log(err);
					} else {
						$message.val("");
					}
				});
			}
		}
	}
});

Template.pageNego.rendered = function() {
	$("textarea").autosize();
	Template.pageNego.scrollDown();
}

Template.pageNego.scrollDown = function() {
	var $messagesContainer = $("#messages-container");
	$messagesContainer.scrollTop($messagesContainer[0].scrollHeight);
}

/*Template.message.img = function() {
	var fbId = Meteor.users.findOne({_id: "Ztg5NuWnTrzsBM8Qu"}).services.facebook.id;
	return $.getJSON("https://graph.facebook.com/" + fbId + "?fields=picture.width(100).height(100)").responseJSON;
}*/

Template.message.text = function() {
	return new Handlebars.SafeString(this.text);
}

Template.pageItemInbox.rendered = function() {
    if(Meteor.user().new_message)
        Meteor.call('clearMessages');
};
