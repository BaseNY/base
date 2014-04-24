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

Template.commentBox.rendered = function() {
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

Template.commentBox.events({
    'keypress #commentContent' : function(e) {
        e.preventDefault();
        if(e.charCode == 13) {
            text = $('#commentContent').html();
            text.trimLeft(' ');
            if(text != '') {
                text.trimRight(' ');
                //submit comment
            }
            $('#commentContent').empty();
        }
    }
});
