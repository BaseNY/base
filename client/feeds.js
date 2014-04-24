Template.ifEven.isEven = function(i) {
    return i%2 == 0;
}

Template.pageFeeds.posts = function() {
    return FtoI.find({},{sort:{_id:1}, limit:10}).fetch();
}

Template.feedPost.isSellPost = function() {
    if(Items.findOne({_id:this.itemId}) != undefined)
        return Items.findOne({_id: this.itemId}).buy != true;
    else 
        return false;
}

Template.feedPost.item = function(){
    return Items.findOne({_id: this.itemId});
}

Template.feedPost.feed = function() {
    return Feeds.findOne({_id: this.feedId});
}

Template.feedPost.comments = function() {
    return Items.findOne({_id: this.itemId}).comments;
}

Template.feedPost.rendered = function() {
    $('div').on('activate', function() {
        $(this).empty();
        var range, sel;
        if ( (sel = document.selection) && document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(this);
            range.select();
        }
    });

    $('div').focus(function() {
        if (this.hasChildNodes() && document.createRange && window.getSelection) {
            $(this).empty();
            var range = document.createRange();
            range.selectNodeContents(this);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    });
}

Template.feedPost.events({
    'keypress #commentContent' : function(e) {
        if(e.charCode == 13) {
        e.preventDefault();
            text = $('#commentContent').html();
            text.trimLeft(' ');
            if(text != '') {
                text.trimRight(' ');
                Meteor.call('addComment', text, this.itemId, function() {
alert('comment posted');
                });
            }
            $('#commentContent').empty();
        }
    }
});

Template.comment.helpers({
    'name' : function() {
        return Meteor.users.findOne({_id: this[0]}).profile.name;
    },
    'imgUrl' : function() {
        u = Meteor.users.findOne({_id: this[0]}).services.facebook;
        url = u.img;
        if(url == null)
            url = 'http://graph.facebook.com/' + u.id + '/picture';
        return url;
    }
});
