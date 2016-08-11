$(document).ready(function() {
	var click;
	//判断支不支持触屏
	if ('ontouchstart' in window) {
		click = 'touchstart';
	} else {
		click = 'click';
	}

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

	function init() {
		initElement();
		reSize();
		var swiper = new Swiper('.swiper-container', {
			scrollbar: '.swiper-scrollbar',
			direction: 'vertical',
			slidesPerView: 'auto',
			mousewheelControl: true,
			freeMode: true
		});
		clickView();
		closeView();
	};
	init();

	function reSize() {
		var fs = $(".col p:nth-of-type(1)").width() / $(".col p:nth-of-type(1)").height();
		fontSize(fs);
		$(window).resize(function() {
			fontSize(fs);
		});
	};

	function fontSize(fs) {
		if (getWidth() > 500) {
			$(".col p:nth-of-type(2)").css('font-size', fs * 26 + 5);
		} else {
			$(".col p:nth-of-type(2)").css('font-size', fs * 26);
		}
	};

	function initElement() {
		$("body").css({
			'width': getWidth(),
		});
		$('.leftToCenter').each(function(i) {
			$(this).css({
				'margin-left': (-1) * ($(this).width() / 2)
			});
		});

		if (getWidth() > 375) {
			var colW = (getWidth() - 80) / 2;
			$(".col-1").css({
				'width': colW
			});
			$('.row').each(function(i) {
				var rowH = colW * 366 / 260;
				$(this).css({
					'height': rowH
				})
			});
			$(".row-box").each(function(i) {
				var boxW = $(this).children('.col1').width();
				$(this).css({
					'width': (boxW * 2) + 40
				});
			});
		}
		var tsH = $(".row").eq(0).height() * $(".row").length + getHeight() - 100;
		var str = tsH + 'px !important';
		$(".teacher-show").height(tsH);
		var bg1W = getWidth() * 0.3;
		var bg2W = getWidth() * 0.45;
		$(".bg1").css({
			'width': bg1W,
			'height': bg1W * 110 / 180
		});
		$(".bg2").css({
			'width': bg2W,
			'height': bg2W * 320 / 270
		});
		var tdata = $(".t-data >div");
		tdata.each(function(i) {
			var tdatap1H = $(this).find(".t-1").height();
			var tdatap2H = $(this).find(".content").height();
			var tdataH=tdatap1H+tdatap2H;
			var pH=parseInt($(this).parent('.t-data').css('height'));
			var mt=(pH-tdataH)/2;
			//alert(tdataH+";"+mt+";"+pH);
			$(this).css({'height':tdataH,'top':mt});
		});
	};

	function clickView() {
		var cs = $(".click-see");
		cs.on(click, function() {
			var t = $(this).data('t');
			/*$('.' + t).css({
				'left': 0,
				'transition': '.9s left ease-in-out'
			});*/
			$('.' + t).removeClass('show-close')
			$('.' + t).addClass('show-open');
			$("." + t).data('open', '1');
		});
	};

	function closeView() {
		var close = $(".close");
		close.on(click, function() {
			$('.show-detail').each(function(i) {
				var open = $(this).data('open');
				if (open == '1') {
					$(this).removeClass('show-open')
					$(this).addClass('show-close')
						/*$(this).css({
							'left': '-100%',
							'transition': '.9s left ease-in-out'
						});*/
					$(this).data('open', '0');
					return false;
				}
			});
		});
	};
});