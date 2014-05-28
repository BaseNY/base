//604800000 is the magic number for a week in milliseconds
timify = function(date) {
	d = moment(date);
	c = moment();
	if(c.diff(d, 'hours') <= 12)
		return d.fromNow();
	else if(c.diff(d,'days') <= 7)
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
