/*-- radial-menu --*/
function radialMenu(warpSelector, startAngle, endAngle) {
	var warp = warpSelector;
	var mainBtn = warp.find('.main-menu');
	var items = warp.find('.menu-item');
	var clickStatus = false;
	mainBtn.click(function(e) {
		e.preventDefault();
		var op = $(this).closest('.radial-menu'); //查找父级元素
		if(!op.hasClass('active') && !clickStatus) {
			op.addClass('active');
		} else {
			op.removeClass('active');
		}
		clickStatus = false;
	});

	var warpWidth = warp.width(),
		radius = warpWidth / 2;
	var startAng = startAngle,
		endAng = endAngle;
	var total = items.length,
		gap = (endAng - startAng) / total;
	//console.log('gap:' + gap);
	//console.log('gap*total:' + Math.abs(gap * total));
	if(Math.abs(gap * total) < 360) {
		gap = (endAng - startAng) / (total - 1);
	}
	$.each(items, function(index, item) {
		//计算第n个元素与 x轴的夹角
		var angle = (startAng + index * gap) * (Math.PI / 180);
		//计算每一个子菜单的坐标
		var px = radius + radius * Math.cos(angle),
			py = radius + radius * Math.sin(angle);
		var options = {
			top: px,
			left: py
		};
		$(this).css(options);
	});
};

//***********************
/*-- clock --*/
function clock() {
	init();

	function init() {
		drawLines($('.line-hour'), 12, 85);
		drawLines($('.line-min'), 60, 90);
		drawNum($('.number'), 12);
		clockMove();
	}

	function drawLines(selector, lineTotal, translateX) {
		var gap = 360 / lineTotal;
		var _html = '';
		for(var i = 0; i < lineTotal; i++) {
			_html += "<li style='" + hackFix('transform', 'rotate(' + i * gap + 'deg) translateX(' + translateX + 'px)') + "'></li>";
		}
		selector.empty().html(_html);
	}

	function drawNum(selector, total) {
		var i, _html = '',
			gap = 360 / total;
		radius = selector.width() / 2;
		for(i = 0; i < total; i++) {
			//计算第n个元素与 x轴的夹角
			var angle = (i * gap) * (Math.PI / 180) - (Math.PI / 3);
			//计算每一个子菜单的坐标
			var px = radius + radius * Math.cos(angle),
				py = radius + radius * Math.sin(angle);
			_html += "<li style='top:" + py + "px;left:" + px + "px'>" + (i + 1) + "</li>";
		}
		selector.empty().html(_html);
	}

	function clockMove() {
		var oHour = $(".hour"),
			oMin = $(".min"),
			oSecond = $(".second");
		setInterval(function() {
			var now = new Date(),
				hour = now.getHours(),
				min = now.getMinutes(),
				second = now.getSeconds();
			var sAngle = second * 6 - 90,
				mAngle = min * 6 + second * 0.1 - 90,
				hAngle = hour * 30 + min * 0.5 - 90;
			
			oHour.css({"transform":"rotate("+hAngle+"deg)","-moz-transform":"rotate("+hAngle+"deg)","-webkit-transform":"rotate("+hAngle+"deg)"});
			oMin.css({"transform":"rotate("+mAngle+"deg)","-moz-transform":"rotate("+mAngle+"deg)","-webkit-transform":"rotate("+mAngle+"deg)"});
			oSecond.css({"transform":"rotate("+sAngle+"deg)","-moz-transform":"rotate("+sAngle+"deg)","-webkit-transform":"rotate("+sAngle+"deg)"});
		}, 1000);
	}

	function hackFix(attribute, value) {
		//-webkit-transform:rotate(0deg) translateX(0px);
		//transform:rotate(0deg) translateX(0px);
		var str = '-webkit-' + attribute + ':' + value + ';' +
			'-moz-' + attribute + ':' + value + ';' +
			attribute + ':' + value + ';'
		return str;
	}
}