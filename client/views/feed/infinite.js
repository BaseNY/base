function showMoreVisible() {
    var threshold, target = $('#showMoreResults');
    if (!target.length) return;
 
    threshold = $(window).scrollTop() + $(window).height() - target.height();
    console.log(target.offset().top);
    console.log(threshold);
    if (target.offset().top <= threshold) {
        if (!target.data('visible')) {
            console.log('target became visible (inside viewable area)');
            target.data('visible', true);
            Session.set('itemsLimit',
                Session.get('itemsLimit') + ITEMS_INCREMENT);
        }
    } else {
        if (target.data('visible')) {
            console.log('target became invisible (below viewable arae)');
            target.data('visible', false);
        }
    }        
}
 
// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);