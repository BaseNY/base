Template.messages.events({
	'keydown #message': function(e) {
		var $message = $("#messages-reply");
		if (e.which === 13) { // if is enter key
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

Template.messages.rendered = function() {
	$("textarea").autosize();
};
