var scrollDownVel = function(elemTo, elemCont) { console.log("scrolling");
    elemTo.velocity('scroll', {
        container: elemCont,
        duration: 50
    });
};

var scrollDown = function(elem) {
    //elem.animate({scrollTop: elem[0].scrollHeight}, 50);
    console.log(elem[0].scrollHeight);
    elem.velocity('scroll', {
        container: elem,
        offset: elem[0].scrollHeight,
        duration: 50
    });
};

Template.messagingPost.messageSent = function(id) {
    $('#message-' + this._id).parent().html('Your message has been sent! Click <a href="' + id + '">here</a> to view the conversation.');
}

Template.messagingPost.sendMsg = function() {
    var item = Items.findOne({
        _id: this._id
    });
    var message = $('#message-' + this._id)[0].innerText;
    Debug.messaging('Sending message with item', item);
    Offers.create(item, message, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(this);
            console.log(res);
            $('#message-' + item._id).parent().html('Your message has been sent! Click <a href="/messages/">here</a> to view the conversation.');
        }
    });
}

Template.messagingPost.rendered = function() {
    setPlaceholder($('div[contenteditable]'));
}

Template.messagingPost.events({
    'click .messageSend': function() {
        Template.messagingPost.sendMsg.call(this);
    },
'keydown .messagingPost': function(e) {
    if(e.which===13 && !e.shiftKey) {
        e.preventDefault();
        Template.messagingPost.sendMsg.call(this);
    }
}

});

Template.messaging.sendMsg = function(e, cId) {
    if(Session.get('uploading')) {
        setInterval(Template.messaging.sendMsg(e), 100);
        return -1;
    }
    var $message = $("#messaging-reply"),
        $messagesContainer = $(".messages-container");
    // if is enter key and shift key is not held down
    if (e.which === 13 && !e.shiftKey) {
        e.preventDefault();
        var text = $message[0].innerText;
        var imgUrl = Session.get('uploadUrl');
        if (text) {
            Messages.create(text, cId, 0, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    $message.html("");
                    scrollDown($messagesContainer);
                }
            });
        }
        if(imgUrl) {
            Messages.create(s3Url + imgUrl, cId, 1, function(err) {
                if(err) {
                    console.log(err);
                } else {
                    $('#add-preview').attr('src','');
                    $('#add-preview').removeClass('filled');
                    scrollDown($messagesContainer);
                }

            });
        }
    }
}

Template.messaging.events({
    'keydown #messaging-reply': function(e) {
        console.log('hello?');
        Template.messaging.sendMsg(e, this.conversationId);
    }
});

Template.message.helpers({
    'isText': function() {
        return !this.type;
    },
    'isPic': function() {
        if (this.type)
    return this.type == 1;
return false;
    },
    'isOffer': function() {
        if (this.type)
    return this.type == 2;
return false;
    }
});

/*
   Template.message.sender = function() {
   return Meteor.users.findOne({_id: this[0].senderId});
   };
   */
var formatDate = function(cd) {
    var d = new Date();
    var time = '';
    if (cd.getHours() > 12) {
        time = (cd.getHours() - 12) + ':' + cd.getMinutes() + 'pm';
    } else if (cd.getHours() == 12) {
        time = 12 + ':' + cd.getMinutes() + 'pm';
    } else {
        time = cd.getHours() + ':' + cd.getMinutes() + 'am';
    }
    if (cd.getMonth() == d.getMonth() && cd.getDate() == d.getDate() && cd.getYear() == d.getYear())
        return time;
    else
        return (cd.getMonth() + 1) + '/' + (cd.getDate() + 1) + ' ' + time;
};

Template.messagingConversation.messageGroups = function() {
    var groups = [];
    var group = null; // { messages}
_.each(this.messages, function(m) {
    //Debug.messaging('each message', m);
    if (!group) {
        group = {
            sender: m.sender,
    messages: [m],
    date: formatDate(m.createdAt)
        };
    } else {
        var messages = group.messages;
        if (messages.length >= 1
            && m.senderId === _.last(messages).senderId
            && (m.createdAt.getTime() - _.last(messages).createdAt.getTime()) < 180000) {
                group.messages.push(m);
            } else {
                groups.push(group);
                group = {
                    sender: m.sender,
    messages: [m],
    date: formatDate(m.createdAt)
                };
            }
    }
});
if (group) {
    groups.push(group);
}
return groups;
}

Template.messagingConversation.rendered = function() {
    $('#add-image').change(function() {
        readUrl(this, 'add-preview');
        $('#add-preview').toggleClass('filled uploading');
    });

    $('.body').autoFit();
    var $messagesContainer = $(".messages-container");
    $messagesContainer.autoFit();
    $(window).resize();
    $(window).bind("load", function() {
        scrollDown($messagesContainer);
    });
}

/*
   Template.messaging.helpers({
   offer: function() {
   if (this.offerId) {
   return Offers.findOne(this.offerId, {
   transform: function(doc) {
   doc.item = Items.findOne(doc.itemId);
   return doc;
   }
   });
   }
   }
   });
   */
