Template.product.events({
	'click #product-bid': function() {
		$('#modal-container').css('display', 'block');
		$('#modal-bid').css('display', 'block');
	}
});

Template.postPage.description = function() {
	return new Spacebars.SafeString(Router.current().data().item.description);
}