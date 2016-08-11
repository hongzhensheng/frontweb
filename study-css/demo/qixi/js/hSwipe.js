function hSwipe(container) {
	var firstElement = container.find(':first');
	//定义滑动对象
	var swipe = {};
	//或取li页面数量
	var slides = firstElement.find('>li');
	//获取容器尺寸
	var width = container.width(),
		height = container.height();
	firstElement.css({
		'width': (slides.length * width) + 'px',
		'height': height + 'px'
	});
	$.each(slides, function(i) {
		var slide = slides.eq(i);
		slide.css({
			'width': width + 'px',
			'height': height + 'px'
		});
	});
	swipe.scrollTo = function(x, speed) {
		var _css = {
			'transition': 'all ' + speed + 'ms linear',
			'-ms-transition': 'all ' + speed + 'ms linear',
			'-moz-transition': 'all ' + speed + 'ms linear',
			'-webkit-transition': 'all ' + speed + 'ms linear',
			'transform':'translate3d(-'+x+'px,0,0)',
			'-ms-transform':'translate3d(-'+x+'px,0,0)',
			'-moz-transform':'translate3d(-'+x+'px,0,0)',
			'-webkit-transform':'translate3d(-'+x+'px,0,0)',
		}
		firstElement.css(_css);
		return this;
	}

	return swipe;
}