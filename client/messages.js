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
        return Offers.find({sellerId: Meteor.userId(), post: this._id}).fetch();
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
        msg.offer=$('#offer').val();
        msg.location = $('#location').val();
        msg.text = $('#message').val();
        msg.post = itemObj.item._id;
        msg.sellerId = itemObj.seller._id;
        msg.seller = Meteor.users.findOne({_id: msg.sellerId}).profile.name;
        msg.conversation = [];
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
