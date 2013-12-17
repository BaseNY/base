showStep = function() {
    $('#product-info').children().css('display','none');
    $('#product-info').children(':nth-child(' + Session.get('postState') + ')').css('display','block');
}
/*
Template.body.events({
    'keydown': function(e) {
	console.log(e);
    }
});
*/

Template.pageAddProduct.rendered = function(){
    showStep();   
    $(document).keypress(function(e) {
	if(e.which == 13) {
	}
    });
};

Template.pageAddProduct.events({
    'click .button' : function() {
	var s = Session.get('postState');
	Session.set('postState',++s);
	showStep();
    }
});
