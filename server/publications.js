Meteor.publish('items', function() {
    return Items.find();
});
Meteor.publish('offers', function() {
    return Offers.find();
});
Meteor.publish('messages', function() {
    return Messages.find();
});
Meteor.publish('ftoi', function(limit, id) {
    if(id){
        if(id[0] == '@')
            return FtoI.find({sellerId: id.substring(1)},{sort: {time: -1}, limit: limit});
        else
            return FtoI.find({feedId: id},{sort: {time: -1},limit:limit});
    }else
        return FtoI.find({},{sort: {time: -1}, limit:limit});
});
Meteor.publish('feeds',function() {
    return Feeds.find();
});
Meteor.publish('userData', function() {
    return Meteor.users.find({},{fields: {'profile': 1, '_id':1}});
});
