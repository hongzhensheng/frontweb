// JavaScript Document
var imgArray = [
	"../image/back-5.png",
	/*"imgandroid/page1-001.png",*/
	"../peixun/imgandroid/page1-005.png",
	"../peixun/imgandroid/page1-003.png",
	"../peixun/imgandroid/page1-006.png",
	"../peixun/imgandroid/page1-007.png",
	"../peixun/imgandroid/page1-002.png",
	"../peixun/imgandroid/page2-001.png",
	"../peixun/imgandroid/page2-007.png",
	"../peixun/imgandroid/page-strategy.png",
	"../peixun/imgandroid/page4-005.png",
	"../peixun/imgandroid/page-t-bg.png",
	"../peixun/imgandroid/page-t-cq.png",
	"../peixun/imgandroid/page-t-nav.png",
	"../peixun/imgandroid/page-t-wm.png"
	/*,
		"images/bg7.jpg",*/
];

// 资源加载
var Loader = function() {
	this.currProgress = 0; // 当前加载进度
	this.isCompleted = false; // 判断是否加载完毕
	this.total = 100; // 最大值100

	var loaded = 1;

	var number = document.getElementById('number');
	this.Loading = function(imgArray, success) {
		var self = this;
		for (var i = 1; i < imgArray.length; i++) {
			var ext = imgArray[i].substring(imgArray[i].lastIndexOf('.')).toLowerCase();
			if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif') {
				var img = new Image();
				img.onload = function() {
					loaded++;
					self.currProgress = loaded / imgArray.length * 100;
					console.log(number.innerHTML);
					if (loaded == imgArray.length) {
						success(); // 回调函数
					}
				};
				img.onerror = function() {
					loaded++;
					if (loaded == imgArray.length) {
						success(); // 回调函数
					}
				};
				img.src = "/" + imgArray[i];
			} else {
				this.loadMusic(imgArray[i]);
			}
		}
	};
	this.loadMusic = function(path) {
		$.ajax({
			type: 'get',
			url: path,
			data: {},
			async: false, // false 同步  true  异步
			success: function(data) {
				loaded++;
				if (loaded == imgArray.length) {
					success(); // 回调函数
				}
			},
			error: function(xhr, type) {
				loaded++;
				if (loaded == imgArray.length) {
					success(); // 回调函数
				}
			}
		})
	};
	this.success = function() {
		console.log("加载完毕");
		init();
	};
	this.loadLoading = function(imgArray, obj) {
		var img = new Image();
		img.onload = function() {
			obj.Loading(imgArray, obj.success);
		};
		img.onerror = function() {
			obj.Loading(imgArray, obj.success);
		};
		img.src = "/" + imgArray[0];
	};
};
//window.onload = function(){};
var loader = new Loader();
loader.loadLoading(imgArray, loader);

function init() {
	$('.load').css('display', 'none');
	$(".hidden").removeClass('hidden').addClass('display');
	//playMusic(); //播放音乐
	$(".page1").addClass('page1-start');
}
/**播放音乐*/
function playMusic() {
	var music = document.getElementById('music');
	//music.currentTime = 0;
	music.play();
};

/**暂停音乐*/
function pauseMusic() {
	var music = document.getElementById('music');
	if (null != music) {
		//if(music.paused)music.play();else music.pause();
		music.paused ? music.play() : music.pause();
	}
};
//
function mobilecheck() {
	var a = !1;
	return function(b) {
		(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
	}(navigator.userAgent || navigator.vendor || window.opera), a
};
/**控制音乐停/放*/
function controlMusic() {
	var e = mobilecheck() ? "touchstart" : "click";
	$("#music-box").on(e, function() {
		var music = document.getElementById('music');
		var musicBox = document.getElementById('music-box');
		//alert(!music.paused)
		if (!music.paused) {
			var a = $(this).hasClass('xuanzhuan');
			$(this).removeClass('xuanzhuan');
			music.pause();
		} else {
			$(this).addClass('xuanzhuan');
			music.play();
		};
	});
};

$(document).ready(function() {
	var click;
	var a = (getWidth() / getHeight()).toFixed(3),
		UL_STANDARD_PRO = 0.667,
		WIDTH = getWidth(),
		HEIGHT = getHeight();
	//
	function mobilecheck() {
		var a = !1;
		return function(b) {
			(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
		}(navigator.userAgent || navigator.vendor || window.opera), a
	};

	//判断支不支持触屏
	if ('ontouchstart' in window) {
		click = 'touchstart';
	} else {
		click = 'click';
	}
	//获取可视区宽度
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
	//获取可视区高度
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

	/***/
	function setCss(o, cssarr) {
		o.css(cssarr);
	};
	/***/
	function constructor(f) {};

	/**初始化元素*/
	function initElement() {
		//alert(WIDTH + ";" + HEIGHT)
		$('html').height(window.screen.height);
		$(".topToCenter").each(function(i) {
			$(this).css('margin-top', (HEIGHT - $(this).height()) / 2);
		});
	};

	function resize() {
		$(window).resize(function() {
			$("body").css({
				'width': '100%',
				'height': '100%'
			})
		});
	};
	/**初始化*/
	function init() {
		controlMusic(); //调用控制音乐
		initElement(); //调用
	};
	init();
});