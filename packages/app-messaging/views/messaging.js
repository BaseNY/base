var scrollDown = function(elem) {
	elem.animate({scrollTop: elem[0].scrollHeight}, 50);
};

Template.messaging.events({
	'keydown #messaging-reply': function(e) {
		var $message = $("#messaging-reply"),
			$messagesContainer = $(".messaging-messages-container");
		// if is enter key and shift key is not held down
		if (e.which === 13 && !e.shiftKey) {
			e.preventDefault();
			if ($message.val()) {
				var doc = {
					text: $message.val(),
					conversationId: this.conversationId
				};
				Messages.insert(doc, function(err) {
					if (err) {
						console.log(err);
					} else {
						$message.val("");
						scrollDown($messagesContainer);
					}
				});
			}
		}
	}
});

Template.messaging.rendered = function() {
	scrollDown($(".messaging-messages-container"));
	//$("textarea").autosize();
};
