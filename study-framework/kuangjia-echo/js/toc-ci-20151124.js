$(document).ready(function() {
	function mobilecheck() {
		var a = !1;
		return function(b) {
			(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
		}(navigator.userAgent || navigator.vendor || window.opera), a
	};
	var click;
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
	/**播放音乐*/
	function playMusic() {
		var music = document.getElementById('music');
		music.currentTime = 0;
	};

	/**暂停音乐*/
	function pauseMusic() {
		var music = document.getElementById('music');
		if (null != music) {
			//if(music.paused)music.play();else music.pause();
			music.paused ? music.play() : music.pause();
		}
	}

	/**初始化*/
	function init() {
		controlMusic(); //调用
		screenProportion();
		initElement(); //调用
	};
	init();

	/**控制音乐停/放*/
	function controlMusic() {
		var e = mobilecheck() ? "touchstart" : "click";
		$("#music-box").on(e, function() {
			var music = document.getElementById('music');
			var musicBox = document.getElementById('music-box');
			//alert(!music.paused)
			if (!music.paused) {
				$(this).removeClass('xuanzhuan');
				music.pause();
			} else {
				$(this).addClass('xuanzhuan');
				music.play();
			};
		});
	};

	/**初始化元素*/
	function initElement() {
		/*var p1Ul = $(".page1-ul"),
			p1Ulleft = (getWidth() - $(".page1-ul").width()) / 2,
			p1Ult = (getHeight() - $(".page1-ul").height()) / 2,
			p1YuanzhuLeft = (p1Ul.width() - $(".yuanzhu").width()) / 2,
			p1YuanzhuT = (p1Ul.height() - $(".yuanzhu").height()) / 2;
		$(".page1-ul").css({
			'margin-left': p1Ulleft,
			'margin-top': p1Ult
		});
		$(".yuanzhu").css({
			'margin-left': p1YuanzhuLeft,
			'margin-top': p1YuanzhuT
		});*/
		$('.leftToCenter').each(function(i) {
			$(this).css('margin-left', (-1) * ($(this).width() / 2));
		});
		$('.topToCenter').each(function(i) {
			$(this).css('margin-top', (-1) * ($(this).height() / 2));
		});
	};
	/**计算屏幕比例**/
	function screenProportion() {
		var a = (getWidth() / getHeight()).toFixed(3);
		/**比例值*/
		var UL_STANDARD_PRO = 0.667, //标准分辨率比例
			PAGE1_LI = 0.68125,
			PAGE1_LOGO = 0.21875,
			PAGE1_A_TOP = 2.333,
			PAGE1_B_TOP = 1,
			PAGE1_C_TOP = 0.6364,
			PAGE1_D_TOP = 0.4667,
			PAGE1_LOGO_TOP = 0.3836,
			PAGE1_PEOPLE_TOP = 0.3889,
			PAGE1_UL_H = 0.292;
		WIDTH = getWidth(),
			HEIGHT = getHeight();
		/**变化对象*/
		var page1Ul = $(".page1-ul"),
			page1Yz = $(".yuanzhu"),
			page1A = $(".a"),
			page1B = $('.b'),
			page1C = $(".c"),
			page1D = $('.d'),
			page1Logo = $(".logo"),
			page1People = $(".people");

		var arr = [
			[page1Yz, 0.4375, 0],
			[page1A, PAGE1_LI, PAGE1_A_TOP],
			[page1B, PAGE1_LI, PAGE1_B_TOP],
			[page1C, PAGE1_LI, PAGE1_C_TOP],
			[page1D, PAGE1_LI, PAGE1_D_TOP],
			[page1Logo, PAGE1_LOGO, PAGE1_LOGO_TOP],
			[page1People, PAGE1_LOGO, PAGE1_PEOPLE_TOP],
		];
		if (a < UL_STANDARD_PRO || a == UL_STANDARD_PRO) {
			var i = 0,
				yzW = WIDTH * arr[0][1];
			page1Ul.height(yzW / PAGE1_UL_H);
			for (i = 0; i < arr.length; i++) {
				arr[i][0].width(WIDTH * arr[i][1]);
				if (i == 1 || i == 3) {
					setCss(arr[i][0], {
						'margin-left': (-1)*(WIDTH * arr[i][1] / 2) + 1 - WIDTH * arr[i][1] * 9 / 218,
						'top': yzW / arr[i][2]
					});
					//arr[i][0].css('margin-left', (-1) * (WIDTH * arr[i][1] / 2) + 1 - WIDTH * arr[i][1] * 9 / 218);
				} else if (i == 2 || i == 4) {
					setCss(arr[i][0], {
						'margin-left': (-1) * (WIDTH * arr[i][1] / 2) + 1 + WIDTH * arr[i][1] * 9 / 218,
						'top': yzW / arr[i][2]
					});
					//arr[i][0].css('margin-left', (-1) * (WIDTH * arr[i][1] / 2) + 1 + WIDTH * arr[i][1] * 9 / 218);
				} else if (i == 5) {
					setCss(arr[i][0], {
						'margin-left': (-1) * (WIDTH * arr[i][1] / 2),
						'top': yzW / arr[i][2]
					});
					//arr[i][0].css('margin-left', (-1) * (WIDTH * arr[i][1] / 2));
				} else if (i == 6) {
					setCss(arr[i][0], {
						'margin-left': (WIDTH * arr[i][1] * 3 / 4),
						'top': yzW / arr[i][2]
					});
					//arr[i][0].css('margin-left', (WIDTH * arr[i][1] * 3 / 4));
				}
			}
		} else {
			for (i = 0; i < arr.length; i++) {
				arr[i][0].width(320 * arr[i][1]);
				if (i == 1 || i == 3) {
					i == 1 ? setCss(arr[i][0], {
						'left': 42,
						'top': 60
					}) : setCss(arr[i][0], {
						'left': 42,
						'top': 220
					});
					//arr[i][0].css('left', 42);
				} else if (i == 2 || i == 4) {
					//setCss(arr[i][0],{'left':60,'top':140});
					i == 2 ? setCss(arr[i][0], {
						'left': 60,
						'top': 140
					}) : setCss(arr[i][0], {
						'left': 60,
						'top': 300
					});
					//arr[i][0].css('left', 60);
				} else if (i == 5) {
					setCss(arr[i][0], {
						'left': 125,
						'top': 365
					});
					//arr[i][0].css('left', 125);
				} else if (i == 6) {
					setCss(arr[i][0], {
						'left': 205,
						'top': 360
					});
					//arr[i][0].css('left', 205);
				}
			}
		}
	}
	/***/
	function setCss(o, cssarr) {
		o.css(cssarr);
	}
	/***/
	function constructor(f) {};
});