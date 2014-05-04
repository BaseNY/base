Template.pageProduct.description = function() {
    return new Handlebars.SafeString(Router.current().data().item.description);
}

Template.sellPost.feeds = function() {
    return Feeds.find().fetch();
}

Template.buyPost.feeds = function() {
    return Feeds.find().fetch();
}

Template.postBox.rendered = function() {
    //init filepicker input type
    //js to make the pretty radio buttons
    $(document).ready(function() {
        $('.highlight-radio[name=type]').change(function() {
            $('.rad').removeClass('checked');
            $('.highlight-label[for=' + this.id + ']').addClass('checked'); 
            console.log(this);
            if(this.value == 'sell') {
                $('#buy-container').slideUp();
                $('#sell-container').slideDown();
            }else{
                $('#sell-container').slideUp();
                $('#buy-container').slideDown();
            }
        });
        $('.cat').change(function() {
            $('.cat').removeClass('checked');
            $('.highlight-label[for=' + this.id + ']').addClass('checked');
        });
    });
}

Template.sellPost.rendered = function() {
    $(document).ready(function() {
        $('#sell-post').click(function(e) {
            $(this).css('pointer-events','none');
            e.preventDefault(); 
            temp = {};
            temp.title = $('input[name=title]').val();
            temp.feeds = [];
            if(Router.current().data())
                temp.feeds.push(Router.current().data().feed._id);
            else
                temp.feeds.push($('input[name=feed]:checked').val());
            /*
               temp.so = $('input[name=so]').val();
               temp.bin = $('input[name=bin]').val();
               temp.condition = $('select[name=condition]').val();
               */
            temp.description = $('#sell-description').val();
            //temp.imageUrl = s3ImageUpload(Meteor.userId(), document.getElementById('image').files[0]);
            //temp.image = document.getElementById('image').files[0];
            console.log(temp);

            //NEED A CHECK TO SEE IF THE FIELDS ARE ALL FILLED
            e.preventDefault();
            console.log("adding item");
            if(!document.getElementById('image').files[0])
                alert('Need an image!');

            s3ImageUpload(Meteor.userId(), temp, document.getElementById('image').files[0],function(temp) {
                Meteor.call('addPost', temp, function(e,r) {
                    console.log("something");
                    if(e) {
                        alert(e);
                    }else{
                        if(r == -1)
                            alert('Need an image url!');
                        else if(r == -2)
                            alert('Need a title!');
                        else if(r == -3)
                            alert('Need a description!');
                        else if(r == -4)
                            alert('Pick a feed!');
                        console.log("done");
                        Router.go('/post/' + r);
                    }
                });
            });
        $('.cat').change(function() {
            $('.cat').removeClass('checked');
            $('.highlight-label[for=' + this.id + ']').addClass('checked');
        });
        });
    });
}

Template.buyPost.rendered = function() {
    $(document).ready(function() {
        $('#buy-post').click(function(e) {
            e.preventDefault(); 
            temp = {};
            temp.feeds = [];
            if(Router.current().data())
                temp.feeds.push(Router.current().data().feed._id);
            else
                temp.feeds.push($('input[name=feed]:checked').val());
            /*
               temp.so = $('input[name=so]').val();
               temp.bin = $('input[name=bin]').val();
               temp.condition = $('select[name=condition]').val();
               */
            temp.description = $('#buy-description').val();
            temp.buy = true;
            console.log(temp);

            //NEED A CHECK TO SEE IF THE FIELDS ARE ALL FILLED
            e.preventDefault();
            console.log("adding item");
            Meteor.call('addRequest', temp, function(e,r) {
                console.log("something");
                if(e) {
                    alert(e);
                }else{
                    console.log("done");
                }
            });
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
