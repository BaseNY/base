Template.ifEven.isEven = function(i) {
    return i%2 == 0;
}

Template.pageFeeds.posts = function() {
    return FtoI.find({},{sort:{_id:-1}, limit:10}).fetch();
}

Template.feedPost.isSellPost = function() {
    return Items.findOne({_id: this.itemId}).buy != true;
}

Template.feedPost.img = function(){
    var ret = "https://scontent-b-iad.xx.fbcdn.net/hphotos-prn2/1472912_392496540884825_988596881_n.jpg";
    return ret;
}

Template.feedPost.item = function(){
    return Items.findOne({_id: this.itemId});
}

Template.feedPost.feed = function() {
    return Feeds.findOne({_id: this.feedId});
}
