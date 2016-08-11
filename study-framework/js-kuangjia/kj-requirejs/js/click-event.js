console.log('Hello I am click-event.js');
//event-click.js
//如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性
define(['jquery', 'math'], function($, math) {
	$('#add').on('click', function() {
		console.log(math.add(10, 3));
	});
});