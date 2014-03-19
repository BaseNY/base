Template.product.events({
    'click #product-bid' : function() {
        $('#modal-container').css('display','block'); 
        Session.set('bid', true);
    }
});

Template.pageItemInbox.user = function() {
    return Meteor.user().profile.name;
}

Template.pageItemInbox.items = function() {
    return Items.find({seller: Meteor.userId()}).fetch();
}

Template.itemsRow.items = function() {
    return Offers.find({seller: Meteor.userId(), item: this.post});
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
        msg.seller = itemObj.seller._id;
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
