function showMoreVisible() {
    var threshold, target = $('#showMoreResults');
    if (!target.length) return;
 
    threshold = $(window).scrollTop() + $(window).height() - target.height();
    if (target.offset().top <= threshold) {
        if (!target.data('visible')) {
            target.data('visible', true);
            Session.set('itemsLimit',
                Session.get('itemsLimit') + ITEMS_INCREMENT);
        }
    } else {
        if (target.data('visible')) {
            target.data('visible', false);
        }
    }        
}
 
// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);
