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
boy.transition({
	'left': $('#content').width() + 'px'
}, 10000, 'linear', function() {});

//////////////////////////////////////////////////////
//===================动画处理==========================//
//////////////////////////////////////////////////////
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
	boy.transition(options, runTime, 'linear', function() {});
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