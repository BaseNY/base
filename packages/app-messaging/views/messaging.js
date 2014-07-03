var scrollDown = function(elem) {
	elem.animate({scrollTop: elem[0].scrollHeight}, 50);
};

Template.messagingPost.messageSent = function(id) {
    $('#message-'+this._id).parent().html('Your message has been sent! Click <a href="' + id + '">here</a> to view the conversation.');
}

Template.messagingPost.events({
    'click .messageSend': function() {
        item=Items.findOne({_id: this._id});

		Messages.send($('#message-' + this._id).html(), item.sellerId, function(err, res) {
			if (err) {
				console.log(err);
			} else {
                
                console.log(this);
    $('#message-'+item._id).parent().html('Your message has been sent! Click <a href="/messages/' + res + '">here</a> to view the conversation.');

			}
		});
    }
});

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
