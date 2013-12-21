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
Template.addTitle.rendered = function(){
    $('form').submit(function(e) {
	e.preventDefault();
	temp = Session.get('tempProdForm');
	temp.title = $('input[name=title]').val();
	Session.set('tempProdForm',temp);
	Router.go('/sell/category');
    });
}

Template.addCategory.rendered = function(){
    $('form').submit(function(e) {
	e.preventDefault();
	temp = Session.get('tempProdForm');
	temp.category = $('input[name=category]').val();
	Session.set('tempProdForm',temp);
	Router.go('/sell/price');
    });
}

Template.addPricing.rendered = function(){
    $('form').submit(function(e) {
	e.preventDefault();
	temp = Session.get('tempProdForm');
	temp.so = $('input[name=so]').val();
	temp.bin = $('input[name=bin]').val();
	Session.set('tempProdForm',temp);
	Router.go('/sell/condition');
    });
}

Template.addCondition.rendered = function(){
    $('form').submit(function(e) {
	e.preventDefault();
	temp = Session.get('tempProdForm');
	temp.condition = $('select[name="condition"]').val();
	Session.set('tempProdForm',temp);
	Router.go('/sell/describe');
    });
}


Template.addDescription.rendered = function(){
    $('form').submit(function(e) {
	e.preventDefault();
	temp = Session.get('tempProdForm');
	temp.description = $('#itemDescription').html();
	Session.set('tempProdForm',temp);
	Router.go('/sell/preview');
    });
}

Template.pageAddProduct.rendered = function(){
    if(!Session.get('tempProdForm'))
	Session.set('tempProdForm',{});
    /*
       $('form').submit(function(e) {
       e.preventDefault();	    
       });
       $(document).keypress(function(e) {
       if(e.which == 13) {
       $('.show .button').click();
       }
       });
       */
};
/*
   Template.pageAddProduct.events({
   'click .button' : function() {
   var s = Session.get('postState');
   if(!verifyField($('.show'))) {
   alert('You must fill out the field!');
   return -1;
   }
   if(s == 6) {
   console.log("adding");
   var f = $('form').serializeArray();
   var tempDict = {};
   for (x in f) {
   tempDict[f[x].name] = f[x].value;
   }
   tempDict['description'] = $('#itemDescription').html();
   Session.set('tempProdForm', tempDict);
   }
   Session.set('postState',++s);
   showStep();
   },
   });
   */



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
