Template.messages.events({
	'keydown #messages-reply': function(e) {
		var $message = $("#messages-reply");
		// if is enter key and shift key is not held down
		if (e.which === 13 && !e.shiftKey) {
			e.preventDefault();
			if ($message.val()) {
				var data = {
					text: $message.val(),
					offerId: this.offerId
				};
				Meteor.call("createMessage", data, function(err) {
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
