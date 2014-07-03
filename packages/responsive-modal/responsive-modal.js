(function() {
	// ============= UTIL =============
	var debug = true;
	var log = function(text) {
		if (debug) {
			var date = new Date();
			var time = _([date.getHours(), date.getMinutes(), date.getSeconds()])
				.map(function(t) {
					if (t < 10) {
						return '0' + t;
					}
					return t;
				}).join(':');

			if (_.isObject(text)) {
				console.log('%c [' + time + ']', 'color: #3D9970');
				console.log(text);
			} else {
				console.log('%c [' + time + '] ' + text, 'color: #3D9970');
			}
		}
	};

	// ============= SETUP =============
	var MODAL_NAME = 'rmodal',
		MODAL_CLASS = '.' + MODAL_NAME, // .responsive-modal
		MODAL_CLOSE = MODAL_CLASS + '-close',
		MODAL_WINDOW = MODAL_CLASS + '-window',
		MODAL_WRAPPER = '<div class="' + MODAL_NAME + '-wrapper"></div>';

	// ============= MAIN =============

	// param is any element inside the modal or modal itself
	var closeModal = function(elem) {
		var $modal = elem.closest(MODAL_CLASS),
			$modalWindow = $modal.find(MODAL_WINDOW);
		$modal.velocity({opacity: 0}, {
			display: 'none',
			duration: 50
		});
	};
	var openModal = function(id) {
		var $modal = $(id),
			$modalWindow = $modal.find(MODAL_WINDOW);
		$modalWindow.velocity({opacity: [1, 0]}, {
			duration: 200
		});
		$modal.velocity({opacity: [1, 0]}, {
			display: 'block',
			duration: 50,
		});
	};

	window.responsiveModal = function(options) {
		// set default options
		_.defaults(options, {
			breakpoint: 500 // the width in px at which the modal fills the window
		});

		// get all modals
		var $modals = $(MODAL_CLASS),
			$modalWindows = $(MODAL_WINDOW),
			$closeButtons = $(MODAL_CLOSE);

		// close modal when clicking on the close button or the backdrop
		var closeModals = function() {
			closeModal($(this));
		};
		$modals.click(closeModals);
		$closeButtons.click(closeModals);

		// stop the modal from closing when clicked on
		$modalWindows.click(function(e) {
			e.stopPropagation();
		});

		// setup buttons for each modal
		$modals.each(function() {
			var id = '#' + $(this).attr('id');
			var $button = $('[data-target="' + id + '"]');
			$button.click(function() {
				openModal(id);
			});
		});
	};
})();
