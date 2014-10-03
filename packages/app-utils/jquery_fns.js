Debug.order('app-utils/jquery_fns.js');

$.fn.siblingHeight = function() {
	var $this = $(this);
	var siblingHeight = 0;
	$this.siblings().each(function() {
		var $sibling = $(this);
		if ($sibling.css('position') !== 'fixed' && $sibling.css('display') !== 'none') {
			siblingHeight += $sibling.outerHeight(true);
		}
	});
	return siblingHeight;
};

$.fn.autoFit = function() {
	var $this = $(this);
	$(window).resize(function() {
		var height = $this.parent().outerHeight(true) - $this.siblingHeight();
		$this.css('height', height);
	}).resize();
};

$.fn.setPlaceholder = function() {
	var $this = $(this);
	var placeholder = $this.attr('placeholder');
	if (placeholder) {
		$this.html('<span class="placeholder">' + placeholder + '</span>');
	}
};
