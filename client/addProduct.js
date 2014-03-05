/*var showStep = function() {
  $('#product-info').children().removeClass('show');
  $('#product-info').children(':nth-child(' + Session.get('postState') + ')').addClass('show');
  }
  */

var verifyField = function(a) {
    var b = a.find('input, select').val();
    return (b != undefined && b != '') || Session.get('postState') == 5; 
}

//The following code will take care of verfying and submitting all of the posts, when I care to finish writing it.
//redo it so that the thing is on one page
Template.addTitle.rendered = function(){
    $('form').submit(function(e) {
	e.preventDefault();
	temp = Session.get('tempProdForm');
	temp.title = $('input[name=title]').val();
	Session.set('tempProdForm',title);
	Router.go('/sell/info');
    });
}

Tempate.addInfo.rendered = function() {
    $('form').submit(function(e) {
        e.preventDefault();
        temp = Session.get('tempProdForm');
        temp.title = $('input[name=title]').val();
	temp.category = $('input[name=category]').val();
	temp.so = $('input[name=so]').val();
	temp.bin = $('input[name=bin]').val();
	temp.condition = $('select[name="condition"]').val();
	temp.description = $('#itemDescription').html();
        Session.set('tempProdForm', title);
    });
}

Template.postPreview.rendered = function(){
    $('#addProdBut').click(function(e) {
	e.preventDefault();
	console.log("adding item");
	Meteor.call('addProduct', Session.get('tempProdForm'), function(e,r) {
	    console.log("something");
	    if(e) {
		alert(e);
	    }else{
		console.log("done");
		Router.go('/post/' + r);
	    }
	});
    });
}

Template.pageAddProduct.rendered = function(){
    if(!Session.get('tempProdForm'))
	Session.set('tempProdForm',{});
};


/*
Template.postPreview.helpers({
    'title': function() {
	if(Session.get('tempProdForm'))
    return Session.get('tempProdForm').title;
    },
    'category': function() {
	if(Session.get('tempProdForm'))
    return Session.get('tempProdForm').category;
//return $('[name=category]').val();
    },
    'so': function() {
	if(Session.get('tempProdForm'))
    return Session.get('tempProdForm').so;
//return $('[name=so]').val();
    },
    'bin': function() {
	if(Session.get('tempProdForm'))
    return Session.get('tempProdForm').bin;
//return $('[name=bin]').val();
    },
    'condition': function() {
	if(Session.get('tempProdForm'))
	    return Session.get('tempProdForm').condition;
	//return $('[name=condition]').val();
    },
    'description': function() {
	if(Session.get('tempProdForm'))
	    return Session.get('tempProdForm').description;
	//return $('#itemDescription').html();
    },
});
*/
