Template.product.events({
	'click #product-bid': function() {
		$('#modal-container').css('display', 'block');
		$('#modal-bid').css('display', 'block');
	}
});

Template.pageProduct.description = function() {
	return new Handlebars.SafeString(Router.current().data().item.description);
}
