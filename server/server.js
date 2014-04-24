if(Feeds.findOne() == undefined) {
    Feeds.insert({name:'Electronics'});
    Feeds.insert({name:'Clothing'});
    Feeds.insert({name:'Sneakers'});
}
Meteor.methods({
    addProduct: function(p) {
        console.log('called');
        p.sellerId = this.userId;
        p.seller = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
        p.time = new Date();
        //p.imageUrl = s3ImageUpload(this.userId, p.image);
        var temp = Items.insert(p);
        /*
        es.create({
            index: 'base',
            type: 'item',
            body: {
                name: p.title,
                desc: p.description,
                image: p.imageUrl
            }
        });
        */
        console.log(temp);
        //linker. pushes the id of the item, and the id of the category
        for(x in p.feeds)
    FtoI.insert({'feedId': p.feeds[x], 'itemId': temp});
return temp;
},
addRequest: function(p) {
    p.sellerId = this.userId;
    p.seller = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
    p.time = new Date();
    var temp = Items.insert(p);
    for(x in p.feeds) 
        FtoI.insert({'feedId': p.feeds[x], 'itemId': temp});
},
    addBid: function(p) {
        console.log('called' + p);
        p.fromId = Meteor.userId();
        p.from = Meteor.users.findOne({_id:Meteor.userId()}).profile.name;
        p.time = new Date(); 

        var offer = {
            sellerId: p.toId,
            seller: p.to,
            buyerId: p.fromId,
            buyer: p.from,
            time: p.time,
            location: p.location,
            offer: p.offer,
            postId: p.postId
        };

        var oId = Offers.insert(offer);
        p.offerId = oId;

        /*
           if(p.buyer == p.seller) {
           return -1;
           }
           */
        return Messages.insert(p);
    },
    addComment: function(t, id) {
        comments = Items.findOne({_id: id}).comments;
        if(comments == undefined)
            comments = [];
        toAdd = [this.userId, t];
        comments.push(toAdd);
        Items.update({_id:id},{$set:{comments: comments}});
        return toAdd;
    },
    resetAccounts: function() {
        Meteor.users.remove({});
        console.log(Meteor.users.find().fetch());
    },
    resetItems: function() {
        Items.remove({});
    },
    resetMsg: function() {
        Messages.remove({});
        Offers.remove({}); 
    },
    resetFeeds: function() {
        FtoI.remove({});
    }
    })
