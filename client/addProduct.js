showStep = function() {
    $('#product-info').children().removeClass('show');
    $('#product-info').children(':nth-child(' + Session.get('postState') + ')').addClass('show');
	    }

verifyField = function(a) {
    var b = a.find('input, select').val();
    return (b != undefined && b != '') || Session.get('postState') == 5; 
}

	    Template.pageAddProduct.rendered = function(){
		showStep();   
		$('form').submit(function(e) {
		    e.preventDefault();	    
		});
		$(document).keypress(function(e) {
		    if(e.which == 13) {
			$('.show .button').click();
		    }
		});
	    };

	    Template.pageAddProduct.events({
		'click .button' : function() {
		    var s = Session.get('postState');
		    if(!verifyField($('.show'))) {
			alert('You must fill out the field!');
			return -1;
		    }
		    if(s == 5) {
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
