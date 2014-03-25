Template.product.events({
    'click #product-bid' : function() {
        $('#modal-container').css('display','block'); 
        $('#modal-bid').css('display','block');
    }
});

Template.pageItemInbox.user = function() {
    return Meteor.user().profile.name;
}

Template.pageItemInbox.items = function() {
    return Items.find({sellerId: Meteor.userId()}).fetch();
}

Template.itemsRow.helpers({
    offers: function() {
        return Offers.find({sellerId: Meteor.userId(), postId: this._id}).fetch();
    }
});


Template.itemsRow.test = function(e) {
    return e;
}

Template.modalBid.events({
    'click #sendBid' : function() {
        var itemObj = Router.current().options.data();
        /*
        if (itemObj.seller._id == Meteor.userId()) {
            alert('You cannot bid for your own item!'); 
        }
        */

        var msg = {};
        msg.type = 1;
        msg.text = $('#message').val();
        msg.toId = itemObj.seller._id;
        msg.to = Meteor.users.findOne({_id: msg.sellerId}).profile.name;

        msg.offer=$('#offer').val();
        msg.location = $('#location').val();
        msg.postId = itemObj.item._id;
        msg.public = false;
        Meteor.call('addBid', msg, function(e,r){
            if(e)
                alert(e);
            else{
                if(r==-1)
                    alert('You cannot bid on your own post');
                Template.modalOverlay.close();
            }
        });
    }
});
