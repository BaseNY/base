Template.loginModal.rendered = function() {
	$('.fb-login').click(function() {
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
					RModal.openModal($('#feed-select-modal'));
				}
			}
		});
	});
};

Template.loginModalButton.rendered = function() {
	RModal();
};

Template.feedSelectModal.helpers({
	feeds: function() {
		if (Meteor.isLoggedIn()) {
			var subscribed = Meteor.user().subscribed;
			return Feeds.find({_id: {$in: subscribed}});
		} else {
			return null;
		}
	}
});

Template.feedSelectModal.rendered = function() {
	$('#feed-select-list li').click(function() {
        console.log(this);
		$(this).toggleClass('checked');
	});
	$('#feed-select-modal .button').click(function() {
		var feeds = $('#feed-select-list').children('.checked');
		var feedIds = _.map(feeds, function(feed) {
			return $(feed).attr('name');
		});
		Meteor.users.update(Meteor.userId(), {$set: {'subscribed': feedIds}});
		RModal.closeModal($('#feed-select-modal'));
                RModal.openModal($('#zip-select-modal'));
	});
};

Template.zipSelectModal.rendered = function() {
    $('#zip-select-modal .button').click(function() {
        var zip = $('#zipInput').val();
        var l = zip.length;
        if(!(zip > 10000 && zip < 15000)) {
            Session.set('zipError', 'Sorry, but you live in an area not supported by base yet. Be sure to check back in the future when we launch elsewhere!');
        }
        var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
        if(isValidZip) {
            Meteor.users.update(Meteor.userId(), {$set: {'profile.zip': zip}});
		    RModal.closeModal($('#zip-select-modal'));
        }else
            Session.set('zipError', 'The zip code you have entered is not valid!');
    });
}

Template.zipSelectModal.error = function() {
    if(Session.get('zipError'))
        return Session.get('zipError');
    return false;
}
