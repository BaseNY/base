Items = new Meteor.Collection('items');

if (Meteor.isClient) {
	Template.itemResults.helpers({
		items: function() {
			return Items.find();
		}
	});
}
