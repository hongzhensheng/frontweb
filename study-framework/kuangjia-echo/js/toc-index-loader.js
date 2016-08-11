/**/
window.onload = function() {
	//
};
$(document).ready(function() {
	function getWidth() {
		var width = window.innerWidth;
		if (typeof width != 'number') {
			if (document.compatMode == 'CSS1Compat') {
				width = document.documentElement.clientWidth;
			} else {
				width = document.body.clientWidth;
			}
		}
		return width;
	};

	function getHeight() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		if (typeof width != 'number') {
			if (document.compatMode == 'CSS1Compat') {
				height = document.docuementElement.clientHeight;
			} else {
				height = document.body.clientHeight;
			}
		}
		return height;
	};

	function initElement() {
		$("body").css({
			'width': getWidth()
		});
		$(".tb-3").css('width', (getWidth() - 20) / 3);
		$(".tb-2").css('width', (getWidth() - 20) * 2 / 3);
		$(".tb-1").css('width', (getWidth() - 10));
		$(".tb-col-1").css('height', (getHeight() - 70) / 5);
		$(".tb-col-2").css('height', $('.row4-right').height());
		$(".tb-img").each(function(i) {
			$(this).css({
				'width': (getHeight() - 70) / 5 - 45,
				'height': (getHeight() - 70) / 5 - 45
			});
		});
		$(".tb-col").each(function(i) {
			$(this).css({
				'margin-top': ($(this).parent('.col').height() - $(this).height()) / 2
			});
		});
		$(".row").each(function() {
			$(this).css('height', $(this).children('.col').eq(0).height());
		});
		$(".row4-left .row4-tb-col").each(function(i) {
			$(this).css('margin-top', ($(this).parent('.row4-left').height() - $(this).height()) / 2);
		});
	};

	function init2() {
		initElement();
	};
	init2(); //
});