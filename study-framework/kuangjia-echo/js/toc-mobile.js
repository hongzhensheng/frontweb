$(document).ready(function() {
	//判断支不支持触屏
	if ('ontouchstart' in window) {
		var click = 'touchstart';
	} else {
		var click = 'click';
	}
	//头部左边菜单事件
	$('#header-menu').bind('click', function() {
		if (!$(this).hasClass('open')) {
			openMenu();
			//取消默认事件
			document.ontouchmove = function(e) {
				e.preventDefault();
			}
		} else {
			closeMenu();
		}
	});
	$('.left-menu ul li').each(function() {
		var _this = $(this);
		_this.on(click, function(e) {
			e.preventDefault();
			jumpByPath($(this).attr('data-link'));
			closeMenu();
		});
	});

	function jumpByPath(path) {
		window.location.href = "" + path;
	};

	function openMenu() {
		$('.header-menu').addClass('open');
		$('.y').fadeOut(100);
		$('.swiper-container').css({
			'left': 190,
			'transition': '.1s left linear'
		});
		setTimeout(function() {
			$('.x').addClass('rotate45');
			$('.z').addClass('rotate135');
			$('.left-menu').css({
				'left': 0,
				'transition': '.1s left linear'
			});
		}, 10);
	};

	function closeMenu() {
		$('.left-menu').css({
			'left': -190,
			'transition': '.1s left linear'
		});
		$('.swiper-container').css({
			'left': 0,
			'transition': '.1s left linear'
		});
		$('.y').fadeIn(150);
		$('.header-menu').removeClass('open');
		$('.x').removeClass('rotate45');
		$('.z').removeClass('rotate135');
		setTimeout(function() {
			$('.x, .z').removeClass('collapse');
		}, 70);
	};
});