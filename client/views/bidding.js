Template.bidding.events({
	'click #sendMsg': function() {
		var item = Items.findOne({
			_id: this._id
		});
		console.log("bidding item:");
		console.log(item);
		console.log();

		var msg = {
			text: $('#message').val()
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



/*Template.message.img = function() {
	var fbId = Meteor.users.findOne({_id: "Ztg5NuWnTrzsBM8Qu"}).services.facebook.id;
	return $.getJSON("https://graph.facebook.com/" + fbId + "?fields=picture.width(100).height(100)").responseJSON;
}*/
