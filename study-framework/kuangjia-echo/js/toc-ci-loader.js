// JavaScript Document
var imgArray = [
	"image/back-5.png",
	"imgci/yuanzhu.png",
	"imgci/a.png",
	"imgci/b.png",
	"imgci/c.png",
	"imgci/d.png",
	"imgci/people.png",
	"imgci/page2-002.png",
	"imgci/page2-008.png",
	"imgci/page3.gif",
	"imgci/page4-006.png",
	"imgci/page4-005.png",
	"imgci/page5-bg.png",
	"imgci/page5-001.png",
	"imgci/page5-002.png",
	"imgci/page5-004.png",
	"imgci/page6-desk.png"
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
				img.src = "/newToceanSoft-Mobile-2/" + imgArray[i];
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
		img.src = "/newToceanSoft-Mobile-2/" + imgArray[0];
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