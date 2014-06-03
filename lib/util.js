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
