//604800000 is the magic number for a week in milliseconds
timify = function(date) {
    d = moment(date);
    c = moment();
    var d_diff = c.diff(d, 'days');
    if(c.diff(d, 'hours') <= 12)
        return d.fromNow();
    else if(d_diff <= 1)
        return d.calendar();
    else if(d_diff < 4)
        return d.fromNow() + ' at ' + d.format('h:mm a');
    else if(d_diff <= 7)
        return d.calendar();
    else return d.format('LL');
}

forEach = function(array, action) {
    for(var i=0; i <array.length; i++)
        action(array[i]);
}

getItemIdArray = function(c) {
    var ret = [];
    forEach(c, function(o) {
        ret.push(o.itemId);    
    });
    return ret;
}

formatNotif = function(obj) {
    text = '';
    if(obj.type == 1) {
        var nameList = obj.commenters.reverse();
        var i = nameList.length;
        if(i == 1) 
            text = text + nameList[0];
        if(i == 2)
            text = text + nameList[0] + ' and ' + nameList[1];
        if(i == 3)
            text = text + nameList[0] + ', ' + nameList[1] + ', and ' + nameList[2];
        if(i == 4)
            text = text + nameList[0] + ', ' + nameList[1] + ', and ' + (i-2) + ' others';
        text = text + ' commented on your post: ' + obj.postName; 
    }else if(obj.type == 2) {
        var nameList = obj.commenters.reverse();
        var i = nameList.length;
        if(i == 1) 
            text = text + nameList[0];
        if(i == 2)
            text = text + nameList[0] + ' and ' + nameList[1];
        if(i == 3)
            text = text + nameList[0] + ', ' + nameList[1] + ', and ' + nameList[2];
        if(i == 4)
            text = text + nameList[0] + ', ' + nameList[1] + ', and ' + (i-2) + ' others';
        text = text + ' commented on a post you commented on: ' + obj.postName; 
    }
    return text;
}

readUrl = function(input, name) {
	 if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	$('#' + name).attr('src', e.target.result);

			Session.set('uploading',true);
			s3ImageUpload(Meteor.userId(), input.files[0], function(r) {
				$('#' + name).toggleClass('uploading');
				Session.set('uploading', false);
				Session.set('uploadUrl', r);
			});
        }
        reader.readAsDataURL(input.files[0]);
    }
}
