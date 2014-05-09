var tempFBLogCode = function() {
	Meteor.loginWithFacebook({
		requestPermissions: ['email',
			'user_about_me',
			'user_birthday',
			'user_location'
		]
	}, function(e) {
		if (e) {
			console.log(e);
			alert(e)
		} else {
			console.log("You have logged in!");
			Template.modalOverlay.close();
		}
	})
}

Template.header.events({
	'click #openLogin': function() {
		//if not logged in 
		//open the modal screen
		//login, signup, login with fb
		//else
		//automatcially go to the profile page
		$('#modal-container').css('display', 'block');
		$('#modal-signup').css('display', 'block');
	}
});

Template.modalContainer.bid = function() {
	if (Session.get('bid'))
		return true;
}

Template.modalOverlay.close = function() {
	$('#modal-container').css('display', 'none');
	$('#modal-bid').css('display', 'none');
	$('#modal-signup').css('display', 'none');
}

Template.modalOverlay.events({
	'click': function() {
            Session.set('imgUrl',null);
		Template.modalOverlay.close();
	}
});

Template.header.rendered = function() {
	/*
    $('#user-wrapper').hover(showDrop($('#logDrop')), hideDrop($('#hideDrop')));
    */
	$('#user-wrapper').hover(function() {
			$('#logDrop').toggleClass('dropdown');
		},
		function() {
			$('#logDrop').toggleClass('dropdown');
		});
}


//---------------------Stuff in the modal, i.e. account creation-------------------//
//note: Probably want to convert this into server-side code later on for security reasons
Template.modalSignup.rendered = function() {
	/*
	$('form').submit(function() {
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
	$('#fb-login').click(function() {
		tempFBLogCode();
	});
}