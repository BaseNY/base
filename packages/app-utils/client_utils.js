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
		$this.css('height', $this.parent().outerHeight(true) - $this.siblingHeight());
	}).resize();
};
