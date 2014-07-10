var scrollDownVel = function(elemTo, elemCont) { console.log("scrolling");
    elemTo.velocity('scroll', {
        container: elemCont,
        duration: 50
    });
};

var scrollDown = function(elem) {
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
    if(!Meteor.user()) {
        RModal.openModal($('#login-modal'));
        return -1;
    }

    var item = Items.findOne({
        _id: this._id
    });
    var messageBox = $('#message-' + this._id);
    var message = messageBox[0].innerText;
    var type = 0;
    if (messageBox.parent().children('messageType').children('typeCurrent').attr('label') == 'offer');
        type = 2;
    Debug.messaging('Sending message with item', item);
    Offers.create(item, message, type, function(err, res) {
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
    $('.messageText').setPlaceholder();

    $('.messageType').hover(function() {
        $(this).children('.typeDropdown').removeClass('hide');
        $(this).children('.typeCurrent').children('.bottom-right-triangle').addClass('hover');
    }, function() {
        $(this).children('.typeDropdown').addClass('hide');
        $(this).children('.typeCurrent').children('.bottom-right-triangle').removeClass('hover');
    });

    $('.typeDropdown').unbind('click').click(function(e) {
        e.stopPropagation();
        var curr = $(this).parent().children('.typeCurrent');
        var newType = curr.attr('label');
        curr.attr('label',$(this).attr('label'));
        $(this).attr('label',newType);
        $(this).addClass('hide');

        var newClasses = curr.children('i').attr('class');
        curr.children('i').removeClass().addClass($(this).children('i').attr('class'));
        $(this).children('i').removeClass().addClass(newClasses);

        var divChange = $(this).parent().parent().children('div[contenteditable]');
        if(curr.attr('label')=='offer')
            divChange.attr('placeholder','Send an offer..');
        else
            divChange.attr('placeholder','Send a message..');
        setPlaceholder(divChange);

    });

    /*
    $('.messageType').click(function() {
        $(this).children('.typeDropdown').addClass('hide');
    });
    */

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
        var type = 0;
        if(Session.get('making-offer'))
            type = 2;
        if (text) {
            Messages.create(text, cId, type, function(err) {
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
        Utils.readUrl(this, 'add-preview');
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

Template.messagingInfo.events({
    'click .x': function(e) {
        var id = $(e.currentTarget).attr('id').substring(1);
        Meteor.call('clearSafety',id, function(e,r) {
            if(e)
                console.log(e);
            else
                console.log(r);
        });
    }
});
Template.messagingInfo.rendered = function() {
}

Template.messagingInfo.showSafety = function() {
    if(this.safetyMessage)
        return this.safetyMessage.indexOf(Meteor.userId()) + 1;
    return false;
}

Template.messagingInfo.currentOffer = function() {
    retVal = Messages.findOne({_id: this.offer.currentOfferId});
    if(!retVal)
        retVal = Messages.find({type:2, conversationId: this._id}).fetch().reverse()[0];
    return retVal;
     
}

Template.messagingConversation.rendered = function() {
    $('.offer-button').click(function() {
        var $message = $("#messaging-reply");
        if(!Session.get('making-offer')) {
            console.log('making offer is true rn');
            $(this).addClass('active');
            $message.addClass('offer-style');
            $message.attr('placeholder','Offer...');
            $message.setPlaceholder();
            $message.focus();
            Session.set('making-offer', true);
        }else{
            console.log('making offer is true rn');
            $(this).removeClass('active');
            $message.removeClass('offer-style');
            $message.attr('placeholder','Message...');
            $message.setPlaceholder();
            $message.focus();
            Session.set('making-offer', false);
        }
    });

        /*
    $('.offer-button').click(function() {
        if(!Session.get('making-offer')) {
            $(this).attr('contenteditable','true');
            $(this).velocity({width: '+=20%', height: '32px'});
//            $(this).children().velocity('fadeOut', {duration: 100, complete: function() {
            //}});
                Session.set('making-offer', true);    
            $(this).focus();
            $(this).addClass('active');
        }
    });
        */

        /*
    $('body').click(function(e) {
        $container = $('.offer-button.active');
        if(!$container.is(e.target) && $container.has(e.target).length==0){
            Session.set('making-offer',false);
            $container.children().velocity('reverse');
            $container.attr('contenteditable',false).velocity("reverse").removeClass('active');
        }
    });
    */
}

Template.messagingConversation.makingOffer = function() {
    return Session.get('making-offer');
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
