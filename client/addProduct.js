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
    $('.step-circle').removeClass('active complete');
    $($('.step-circle')[0]).addClass('active');

    if(Session.get('tempProdForm'))
        $('input[name=title]').val(Session.get('tempProdForm').title);


    $('form').submit(function(e) {
        e.preventDefault();
        var temp;
        if(Session.get('tempProdForm'))
        temp = Session.get('tempProdForm');
    temp.title = $('input[name=title]').val();
    Session.set('tempProdForm',temp);
    Router.go('/sell/info');
    });
}

var populateInfo = function() {
    temp = Session.get('tempProdForm');
    $('input[name=title]').val(temp.title);
    $('input:radio[name="category"]').filter('[value=' + temp.category + ']').attr('checked', 'checked');
    /*
       $('input[name=so]').val(temp.so);
       $('input[name=bin]').val(temp.bin);
       $('select[name=condition]').val(temp.condition);
       */
    $('#description').html(temp.description);
}

Template.addInfo.feeds = function() {
    return Feeds.find().fetch();
}

//should i put all of this code in it's own stuff hm
Template.addInfo.rendered = function() {
    //maybe i should take care of this by hiding the div instead of having different routes
    $('.step-circle').removeClass('active complete');
    $($('.step-circle')[0]).addClass('complete');
    $($('.step-circle')[1]).addClass('active');

    populateInfo();

    //check if it should be here
    /*
       if(!Session.get('tempProdForm'))
       Router.go('/sell/title');
       */

    if(Session.get('tempProdForm')) {
        temp = Session.get('tempProdForm');
        //nm use helpers HERE 
    }
    $('#b_pNext').click(function(e) {
        e.preventDefault(); 
        temp = Session.get('tempProdForm'); 
        temp.title = $('input[name=title]').val();
        temp.feeds = [];
        temp.feeds.push($('input[name=category]:checked').val());
        /*
           temp.so = $('input[name=so]').val();
           temp.bin = $('input[name=bin]').val();
           temp.condition = $('select[name=condition]').val();
           */
        temp.description = $('#description').html();
        console.log(temp);

        //NEED A CHECK TO SEE IF THE FIELDS ARE ALL FILLED



        Session.set('tempProdForm', temp);
        Router.go('/sell/preview');
    });
    $('#back').click(function(e) {
        Router.go('/sell/title');
    });
}

Template.postPreview.rendered = function(){
    $('.step-circle').removeClass('active complete');
    $($('.step-circle')[0]).addClass('complete');
    $($('.step-circle')[1]).addClass('complete');
    $($('.step-circle')[2]).addClass('active');
    $('#addProdBut').click(function(e) {
        e.preventDefault();
        console.log("adding item");
        Meteor.call('addProduct', Session.get('tempProdForm'), function(e,r) {
            console.log("something");
            if(e) {
                alert(e);
            }else{
                console.log("done");
                Session.set('tempProdForm',null);
                Router.go('/post/' + r);
            }
        });
    });
    $('#back').click(function(e) {
        Router.go('/sell/info');
    });
}

Template.pageAddProduct.rendered = function(){
    if(!Session.get('tempProdForm'))
        Session.set('tempProdForm',{});
};


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

Template.product.description = function() {
    return new Handlebars.SafeString(Router.current().data().item.description);
}

Template.postBox.feeds = function() {
    return Feeds.find().fetch();
}

Template.postBox.rendered = function() {
    $(document).ready(function() {
        $('.highlight-radio[name=type]').change(function() {
            $('.rad').removeClass('checked');
            $('.highlight-label[for=' + this.id + ']').addClass('checked'); 
        });
        $('.cat').change(function() {
            $('.cat').removeClass('checked');
            $('.highlight-label[for=' + this.id + ']').addClass('checked');
        });
        
    });
}

    /*
       Template.postBox.events({
       'change .highlight-radio' : function(e) {
       console.log(e.target.id);
       $('.highlight-label[for=' + e.target.id + ']').toggleClass('checked')
       }
       });
       */
