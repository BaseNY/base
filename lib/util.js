timify = function(date) {
	h = date.getHours();
	m = date.getMinutes();
	if (h > 12) {
		if (m < 10)
			return (h - 12) + ':' + '0' + m + ' PM';
		else
			return (h - 12) + ':' + m + ' PM';
	} else if (m < 10) {
		return h + ':' + '0' + m + ' AM';
	} else {
		return h + ':' + m + 'AM';
	}
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
