Template.ifEven.isEven = function(i) {
    return i%2 == 0;
}

Template.pageFeeds.posts = function() {
    return FtoI.find({},{sort:{_id:1}, limit:10}).fetch().reverse();
}

Template.feedPost.isSellPost = function() {
    if(Template.feedPost.item() != undefined)
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
