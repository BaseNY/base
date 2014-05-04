Meteor.publish('items', function() {
    return Items.find();
});
Meteor.publish('offers', function() {
    return Offers.find();
});
Meteor.publish('messages', function() {
    return Messages.find();
});
Meteor.publish('ftoi', function() {
    return FtoI.find();
});
Meteor.publish('feeds', function() {
    return Feeds.find();
});
Meteor.publish('userData', function() {
    return Meteor.users.find({},{fields: {'profile': 1, '_id':1}});
});
