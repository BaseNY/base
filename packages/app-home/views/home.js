Debug.order('app-home/home.js');

/*Template.home.events({
	'submit #search-form': function(event) {
		event.preventDefault();
		var $form = $(event.currentTarget).find('input');
		var searchQuery = $form.val();
		console.log("searched for: " + searchQuery);
		searchItem(searchQuery, function(err, data) {
			console.log(JSON.stringify(data.hits.hits));
		});
	}
});*/

Template.homeFeed.helpers({
    showImage: function() {
    	return Session.get('imgUrl');
    }
});

Template.homeSidebar.rendered = function() {
	Session.setDefault('degree', 'everyone');
	Session.setDefault('buy', true);
	Session.setDefault('sell', true);
}
