Debug.order('app-home/feed_post_form.js');

Template.feedPostForm.rendered = function() {
    $("body").click(function(e) {
        if (!(e.target.id == "feed-post-container" || $(e.target).parents("#feed-post-container").size())) {
            $header = $('.feed-post-form-header');
            $body = $('.feed-post-form .inner-form');

            $header.children().children('input').prop('checked', false);
            $header.children().children('label').removeClass('checked');

            $body.slideUp();
        }
    });
}

Template.feedPostFormHeader.events({
    'change input:radio': function(e) {
        var $target = $(e.currentTarget),
            $label = $('label[for=' + $target.attr('id') + ']'),
            $sell = $('.feed-post-form-sell'),
            $buy = $('.feed-post-form-buy');

        $label.siblings('label').removeClass('checked');
        $label.addClass('checked');

        var duration = 200;
        if ($target.val() == 'sell') {
            if ($buy.css('display') !== 'none') {
                $buy.velocity('slideUp', duration);
            }
            $sell.velocity('slideDown', duration);
        } else {
            if ($sell.css('display') !== 'none') {
                $sell.velocity('slideUp', duration);
            }
            $buy.velocity('slideDown', duration);
        }
    }
});

Template.feedPostFormSell.events({
    'change #sell-image': function(e) {
        Utils.readUrl(e.currentTarget, 'sell-preview');
        $('#sell-preview').toggleClass('filled uploading');
    },
    'click #sell-post': function(e) {
        if ($('input[type=feed]:checked') && $('#sell-title').val() && $('#sell-description').val()) {
            upload(e);
        }
    },
    'change #sell-fb': function(e) {
        if ($(e.currentTarget).is(':checked')) {
            if (Meteor.isClient) {
                Accounts.ui.config({
                    requestPermissions: {
                        facebook: ['publish_stream']
                    }
                });
            }
        }
    }
});

Template.feedPostFormFeedList.helpers({
    feeds: function() {
        var feeds = Feeds.find().fetch();
        return feeds;
    }
});

Template.feedPostFormFeedList.events({
    'change input:radio': function(e) {
        var $target = $(e.currentTarget),
            $label = $('label[for=' + $target.attr('id') + ']');

        $label.siblings('label').removeClass('checked');
        $label.addClass('checked');
    }
});

//whoops defining a function here...shoot me
var upload = function(e) {
    if (Session.get('uploading') == true) {
        setInterval(upload(e), 100);
    } else {
        $(e.target).css('pointer-events', 'none');
        setInterval(function() {
            $(e.target).css('pointer-events', 'auto');
        }, 1000);
        e.preventDefault();

        if (!Meteor.user()) {
            RModal.openModal($('#login-modal'));
            return -1;
        }
        $(this).css('pointer-events', 'none');

        temp = {};
        temp.title = $('#sell-title').val();
        temp.feeds = [];
        if (Session.get('uploadUrl'))
            temp.imageUrl = S3.url + Session.get('uploadUrl');
        if (Router.current().params.id) {
            temp.feeds.push(Router.current().params.id);
        } else {
            temp.feeds.push($('input[name=feed]:checked').val());
        }
        /*
           temp.so = $('input[name=so]').val();
           temp.bin = $('input[name=bin]').val();
           temp.condition = $('select[name=condition]').val();
           */
        temp.description = $('#sell-description').val();
        //temp.imageUrl = S3.imageUpload(Meteor.userId(), document.getElementById('image').files[0]);
        //temp.image = document.getElementById('image').files[0];
        Debug.feed('temp item', temp);

        // NEED A CHECK TO SEE IF THE FIELDS ARE ALL FILLED
        $('.feed-post-form-sell').slideUp();

        Meteor.call('addPost', temp, function(e, r) {
            console.log("something");
            if (e) {
                alert(e);
            } else {
                if (r == -1)
                    alert('Need an image url!');
                else if (r == -2)
                    alert('Need a title!');
                else if (r == -3)
                    alert('Need a description!');
                else if (r == -4)
                    alert('Pick a feed!');
                console.log("done");
                //	Router.go('/post/' + r);
            }
        });
    }
    return 0;
}

Template.feedPostFormBuy.events({
    'click #buy-post': function(e) {
        if (!($('input[type=feed]:checked') && $('#buy-description').val()))
            return -1;
        if (!Meteor.user()) {
            RModal.openModal($('#login-modal'));
            return -1;
        }
        $(e.target).css('pointer-events', 'none');
        setInterval(function() {
            $(e.target).css('pointer-events', 'auto');
        }, 1000);
        e.preventDefault();

        temp = {};
        temp.feeds = [];
        if (Router.current().params.id)
            temp.feeds.push(Router.current().params.id);
        else
            temp.feeds.push($('input[name=feed]:checked').val());
        /*
   temp.so = $('input[name=so]').val();
   temp.bin = $('input[name=bin]').val();
   temp.condition = $('select[name=condition]').val();
   */
        temp.description = $('#buy-description').val();
        temp.buy = true;
        Debug.feed('temp item', temp);

        //NEED A CHECK TO SEE IF THE FIELDS ARE ALL FILLED
        e.preventDefault();
        Meteor.call('addRequest', temp, function(e, r) {
            console.log("something");
            if (e) {
                alert(e);
            } else {
                console.log("done");
                Router.go('/');
            }
        });
        $('#buy-description').val('');
        $('.feed-post-form-buy').slideUp();
        $('.feed-post-form-header label').removeClass('checked');
        $('#feed-buy-radio').prop('checked', false);
    }
});
