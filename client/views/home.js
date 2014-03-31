Template.home.events({
	'submit #search-form': function(event) {
		event.preventDefault();
		var $form = $(event.currentTarget).find('input');
		var searchQuery = $form.val();
		console.log("searched for: " + searchQuery);
		searchItem("wot");
	}
});