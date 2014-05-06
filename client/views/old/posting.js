Template.pageProduct.description = function() {
	return new Handlebars.SafeString(Router.current().data().item.description);
}

Template.sellPost.feeds = function() {
	return Feeds.find().fetch();
}

Template.buyPost.feeds = function() {
	return Feeds.find().fetch();
}

Template.postBox.events({
	'change #transaction-form .highlight-radio': function(e) {
		$('#transaction-form .highlight-label').removeClass('checked');
		var $target = $(e.currentTarget);
		var $label = $(".highlight-label[for=" + $target.attr('id') + "]")
		$label.addClass('checked');
		if ($target.val() == 'sell') {
			$('#buy-container').slideUp();
			$('#sell-container').slideDown();
		} else {
			$('#sell-container').slideUp();
			$('#buy-container').slideDown();
		}
	},
	'change .container .highlight-radio': function(e) {
		$(".container .highlight-label").removeClass('checked');
		var $target = $(e.currentTarget);
		var $label = $(".highlight-label[for=" + $target.attr('id') + "]");
		$label.addClass("checked");
	}
});

Template.sellPost.events({
	'click #sell-post': function(e) {
		if (!Meteor.user()) {
			$('#modal-container').css('display', 'block');
			$('#modal-signup').css('display', 'block');
			return -1;
		}

		$(this).css('pointer-events', 'none');
		e.preventDefault();
		temp = {};
		temp.title = $('input[name=title]').val();
		temp.feeds = [];
		if (Router.current().data())
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
		if (!document.getElementById('image').files[0]) {
			Meteor.call('addPost', temp, function(e, r) {
				console.log("something");
				if (e) {
					alert(e);
				} else {
					if (r == -2)
						alert('Need a title!');
					else if (r == -3)
						alert('Need a description!');
					else if (r == -4)
						alert('Pick a feed!');
					console.log("done");
					Router.go('/post/' + r);
				}
			});

		} else {

			s3ImageUpload(Meteor.userId(), temp, document.getElementById('image').files[0], function(temp) {
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
						Router.go('/post/' + r);
					}
				});
			});
		}
	}
});

Template.buyPost.events({
	'click #buy-post': function(e) {
		if (!Meteor.user()) {
			$('#modal-container').css('display', 'block');
			$('#modal-signup').css('display', 'block');
			return -1;
		}
		$(e.target).css('pointer-events', 'none');
		setInterval(function() {
			$(e.target).css('pointer-events', 'auto');
		}, 1000);
		e.preventDefault();

		temp = {};
		temp.feeds = [];
		if (Router.current().data())
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
		Meteor.call('addRequest', temp, function(e, r) {
			console.log("something");
			if (e) {
				alert(e);
			} else {
				console.log("done");
				Router.go('/');
			}
		});
		$(e.target).slideUp();
	}
});

/*
   Template.postBox.events({
   'change .highlight-radio' : function(e) {
   console.log(e.target.id);
   $('.highlight-label[for=' + e.target.id + ']').toggleClass('checked')
   }
   });
   */
