Debug.order('app-login/login.js');

Template.loginModalButton.rendered = function() {
    RModal();
};

Template.loginModal.events({
    'click .fb-login': function() {
        /*$('#login-modal form').submit(function() {
          email = $('input[name=email]').val();
          password = $('input[name=password').val();
          first_name = $('input[name=first]').val();
          last_name = $('input[name=last]').val();
          name = first_name + " " + last_name;
          birthday = new Date($('input[name=yy]').val(), $('input[name=mm]').val() - 1, $('input[name=dd]').val());
          zip_code = $('input[name=zip]').val();
          Accounts.createUser(email, password, {
          name: name,
          first_name: first_name,
          last_name: last_name,
          birthday: birthday,
          zip_code: zip_code,
          });
          });*/

        Meteor.loginWithFacebook({
            requestPermissions: [
            'email',
        'user_about_me',
        'user_birthday',
        'user_location',
        'user_friends'
            ]
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("You have logged in!");
                RModal.closeModal($('#login-modal'));
                if (Meteor.user().new) {
                    RModal.openModal($('#zip-select-modal'));
                }
            }
        });
    }
});

Template.feedSelectModal.helpers({
    feeds: function() {
        if (Meteor.isLoggedIn()) {
            var subscribed = Meteor.user().subscribed;
            return Feeds.find({_id: {$in: subscribed}});
        }
    }
});

Template.feedSelectModal.events({
    'click .feed-select-list-item': function(e) {
        $(e.currentTarget).toggleClass('checked');
    },
    'click .feed-select-button': function(e) {
        var feeds = $('#feed-select-list').children('.checked');
        var feedIds = _.map(feeds, function(feed) {
            return $(feed).attr('name');
        });
        Meteor.call('_updateUserFeeds', feedIds, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("Updated feeds: " + res);
                RModal.closeModal($('#feed-select-modal'));
                RModal.openModal($('#note-modal'));
            }
        });
    }
});

zipAction = function() {
    var zip = $('#zipInput').val();
    var email = $('#emailInput').val();
    var l = zip.length;
    if(!(zip > 10000 && zip < 15000)) {
        Session.set('zipError', 'Sorry, but you live in an area not supported by base yet. Be sure to check back in the future when we launch elsewhere!');
    }
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    if (isValidZip) {
        Meteor.users.update(Meteor.userId(), {$set: {'profile.zip': zip, 'profile.email': email}}, function() {
        Meteor.call('sendVerificationEmail');    
        });
        RModal.closeModal($('#zip-select-modal'));
        RModal.openModal($('#feed-select-modal'));
    } else {
        Session.set('zipError', 'The zip code you have entered is not valid!');
    }
}

Template.zipSelectModal.rendered = function() {
    $('#zip-select-modal .button').click(zipAction);
    $('form').submit(zipAction);
}

Template.zipSelectModal.error = function() {
    if(Session.get('zipError'))
        return Session.get('zipError');
    return false;
};
