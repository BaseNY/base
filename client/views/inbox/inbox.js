/*Template.inbox.rendered = function() {
	if (Meteor.user().new_message) {
		Meteor.call('clearMessages');
	}
};*/

Template.inboxSelling.helpers({
	offers: function() {
		console.log(Meteor.userId());
		return Offers.find({
			itemId: this._id
		}).fetch();
	}
});

Template.inboxSelling.events({
	'click .inbox-sold-button': function() {
		// TODO CHECK THAT THIS WORKS CORRECTLY
		Meteor.call('markSold', this, function(err) {
			if (err) {
				console.log(err);
			}
		});
	}
});

Template.inboxBuying.helpers({
	item: function() {
		return Items.findOne({
			_id: this.itemId
		});
	}
});
