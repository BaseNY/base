s3Url = 'https://s3.amazonaws.com/Basel/'; 

Template.homePost.rendered = function() {
    $("body").click(function(e) {
        if(!(e.target.id == "home-post-container" || $(e.target).parents("#home-post-container").size())) {
            $header = $('.home-post-header');
            $body = $('.home-post-body');

            $header.children().children('input').prop('checked', false); 
            $header.children().children('label').removeClass('checked');

            $body.slideUp();
        }
    });
}

Template.homePost.events({
	'change .home-post-header input:radio': function(e) {
		var $target = $(e.currentTarget),
			$label = $(".home-post-header label[for=" + $target.attr('id') + "]"),
			$buy = $("#home-buy-container"),
			$sell = $("#home-sell-container");

		$('.home-post-header label').removeClass('checked');
		$label.addClass('checked');

		if ($target.val() == 'sell') {
			$buy.slideUp();
			$sell.slideDown();
		} else {
			$sell.slideUp();
			$buy.slideDown();
		}

        $('.home-feeds-list').children().children('input').prop('checked',false);
        $('.home-feeds-list').children().children('label').removeClass('checked');

		console.log("wot");
	},
	'change .home-post-body input:radio': function(e) {
		var $target = $(e.currentTarget),
			$label = $(".highlight-label[for=" + $target.attr('id') + "]");

		$(".home-post-body label").removeClass('checked');
		$label.addClass("checked");
	}
});

Template.homePost.readUrl = function(input, name) {
	 if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	$('#' + name).attr('src', e.target.result);

			Session.set('uploading',true);
			s3ImageUpload(Meteor.userId(), input.files[0], function(r) {
				$('#sell-preview').toggleClass('uploading');
				Session.set('uploading', false);
				Session.set('uploadUrl', r);
			});
        }
        reader.readAsDataURL(input.files[0]);
    }
}

Template.homeSellPost.rendered = function(){
	$('#sell-image').change(function(){
		console.log("changed");
		readUrl(this, 'sell-preview');
		$('#sell-preview').toggleClass('filled uploading');
		console.log('uploading now');
	});
};

Template.homeSellPost.feeds = function() {
	return Feeds.find().fetch();
}

Template.homeBuyPost.feeds = function() {
	return Feeds.find().fetch();
}

//whoops defining a function here...shoot me
Template.homeSellPost.upload = function(e) {
	if(Session.get('uploading') == true) {
		setInterval(Template.homeSellPost.upload(e), 100);
	}else {
		$(e.target).css('pointer-events', 'none');
		setInterval(function() {
			$(e.target).css('pointer-events', 'auto');
		}, 1000);
		e.preventDefault();

		if (!Meteor.user()) {
			$('#modal-container').css('display', 'block');
			$('#modal-signup').css('display', 'block');
			return -1;
		}
		$(this).css('pointer-events', 'none');

		temp = {};
		temp.title = $('input[name=title]').val();
		temp.feeds = [];
		if(Session.get('uploadUrl'))
            temp.imageUrl = s3Url + Session.get('uploadUrl');
		if (Router.current().data()) {
			temp.feeds.push(Router.current().data().feed._id);
		} else {
			temp.feeds.push($('input[name=feed]:checked').val());
		}
		/*
		   temp.so = $('input[name=so]').val();
		   temp.bin = $('input[name=bin]').val();
		   temp.condition = $('select[name=condition]').val();
		   */
		temp.description = $('#sell-description').val();
		//temp.imageUrl = s3ImageUpload(Meteor.userId(), document.getElementById('image').files[0]);
		//temp.image = document.getElementById('image').files[0];
		console.log(temp);

		// NEED A CHECK TO SEE IF THE FIELDS ARE ALL FILLED
		console.log("adding item");
		$('#home-sell-container').slideUp();

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

Template.homeSellPost.events({
	'click #sell-post': function(e) {
        if($('input[type=feed]:checked') && $('#item-title').val() && $('#sell-description').val())
		    Template.homeSellPost.upload(e);
			//img parsing & resize
			/*
            var img = document.createElement('img');
            var reader = new FileReader();
            img.src = e.target.result;
            reader.readAsDataURL(file);

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var MAX_WIDTH = 1280;
            var MAX_HEIGHT = 720;
            var width = img.width;
            var height = img.eight;

            if( width > height) {
                if(width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            }else if(height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }

            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            var dataurl = canvas.toDataUrl("image/png");
            console.log(dataurl);
            */

				
			
		
	}
});

Template.homeBuyPost.events({
	'click #buy-post': function(e) {
        if(!($('input[type=feed]:checked') && $('#buy-description').val()))
            return -1;
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
		$('#buy-description').val('');
		$('#home-buy-container').slideUp();
		$('.home-post-header label').removeClass('checked');
		$('#home-buy-radio').prop('checked', false);
	}
});
