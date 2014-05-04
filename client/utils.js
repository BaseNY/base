timify = function(date) {
    h = date.getHours();
    m = date.getMinutes();
    if(h > 12) {
        return (h-12)+':'+m+' PM';
    }else if(m < 10){
        return h + ':' + '0' + m + ' AM';
    }else{
        return h + ':' + m + 'AM';
    }
}
