console.log('main.js load success!');
/*require.config({　　　　
	paths: {　　　　　　
		"jquery": "js/jquery-1.7.2",
		"event": "js/click-event"　　　　
	}　　
});*/
require.config({
	baseUrl: "js/",　　　
	paths: {　　　　　　
		"jquery": "jquery-1.7.2",
		'math':'math',
		"clickEvent": "click-event"　　　　
	}　　
});
require(['jquery', 'clickEvent'], function($,clickEvent) {
	console.log('success!');
});