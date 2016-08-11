var instanceX;
/*
 *小孩走路
 * */
function BoyWalk() {
	var container = $("#content");
	// 页面可视区域
	var visualWidth = container.width();
	var visualHeight = container.height();
	var swipe = hSwipe($('#content'));
	var boy = $('#boy');
	var boyHeight = boy.height();
	//swipe.scrollTo($("#content").width() * (-2), 5000);
	var getValue = function(className) {
		var _elem = $('' + className + '');
		//走路的路线坐标
		return {
			height: _elem.height(),
			top: _elem.position().top
		};
	};
	//路的Y轴
	var pathY = function() {
		var data = getValue('.a-bg-mid');
		return data.top + data.height / 2;
	}();

	//修正小男孩的正确位置
	boy.css({
		'top': pathY - boyHeight + 25
	});
	// 暂停走路
	function pauseWalk() {
		boy.addClass('pauseWalk');
	}
	// 恢复走路
	function restoreWalk() {
		boy.removeClass('pauseWalk');
	};
	// css3的动作变化
	function slowWalk() {
		boy.addClass('slowWalk');
	};
	//计算移动距离
	function calculateDist(direction, proportion) {
		return (direction == 'x' ? visualWidth : visualHeight) * proportion;
	};

	//用transition做运动
	function startRun(options, runTime) {
		var dfdPlay = $.Deferred();
		//恢复走路
		restoreWalk();
		boy.transition(options, runTime, 'linear', function() {
			dfdPlay.resolve(); // 动画完成
		});
		return dfdPlay;
	};
	//开始走路
	function walkRun(time, distX, distY) {
		time = time || 3000;
		slowWalk();
		//开始走路
		var d = startRun({
			'left': distX + 'px',
			'top': distY ? distY : undefined
		}, time);
		return d;
	};
	//走进商店
	function walkToShop(runtime) {
		var defer = $.Deferred();
		var doorObj = $('.door');
		//门的坐标
		var offsetDoor = doorObj.offset();
		var doorOffsetLeft = offsetDoor.left;
		//小孩当前的坐标
		var offsetBoy = boy.offset();
		var boyOffsetLeft = offsetBoy.left;

		//当前需要移动的坐标
		instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffsetLeft + boy.width() / 2);
		//开始走路
		var walkPlay = startRun({
			'transform': 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
			'opacity': 0.1
		}, 2000);
		//走路完毕
		walkPlay.done(function() {
			boy.css('opacity', 0);
			defer.resolve();
		});
		return defer;
	};
	//走出商店
	function walkOutShop(runTime) {
		var defer = $.Deferred();
		restoreWalk();
		//开始走路
		var walkPlay = startRun({
			'transform': 'translateX(' + instanceX + 'px),scale(1,1)',
			'opacity': 1
		}, 2000);
		//走路完毕
		walkPlay.done(function() {
			defer.resolve();
		});
		return defer;
	};
	//取花
	function talkFlower() {
		//增加延时等待效果
		var defer = $.Deferred();
		setTimeout(function() {
			boy.addClass('slowFlowerWalk');
			defer.resolve();
		}, 1000);
		return defer;
	};
	return {
		//开始走路
		walkTo: function(time, proportionX, proportionY) {
			var distX = calculateDist('x', proportionX);
			var distY = calculateDist('y', proportionY);
			return walkRun(time, distX, distY);
		},
		toShop: function() {
			return walkToShop.apply(null, arguments);
		},
		outShop: function() {
			return walkOutShop.apply(null, arguments);
		},
		stopWalk: function() {
			pauseWalk();
		},
		setColor: function(value) {
			boy.css('background-color', value);
		},
		// 获取男孩的宽度
		getWidth: function() {
			return boy.width();
		},
		talkFlower: function() {
			return talkFlower();
		}, // 复位初始状态
		resetOriginal: function() {
			this.stopWalk();
			// 恢复图片
			boy.removeClass('slowWalk slowFlowerWalk').addClass('boyOriginal');
		},
		setFlolerWalk: function() {
			boy.addClass('slowFlowerWalk');
		}
	}
};