// JavaScript Document
var imgArray = [
	"image/back-5.png",
	"imgandroid/page1-001.png",
	"imgandroid/page1-005.png",
	"imgandroid/page1-003.png",
	"imgandroid/page1-006.png",
	"imgandroid/page1-007.png",
	"imgandroid/page1-002.png",
	"imgandroid/page2-001.png"
	/*,
		"images/bg7.jpg",*/
];
// 资源加载
var Loader = function() {
	this.currProgress = 0; // 当前加载进度
	this.isCompleted = false; // 判断是否加载完毕
	this.total = 100; // 最大值100

	var loaded = 1,n;

	var number = document.getElementById('number');
	this.Loading = function(imgArray, success) {
		var self = this;
		for (var i = 1; i < imgArray.length; i++) {
			var ext = imgArray[i].substring(imgArray[i].lastIndexOf('.')).toLowerCase();
			if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif') {
				var img = new Image();
				img.onload = function() {
					n=loaded++;
					number.innerHTML=n;
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
				img.src ="/newToceanSoft-Mobile-2/" + imgArray[i];
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
		$('.load').css('display','none');
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
//window.onload = function(){
var loader = new Loader();
loader.loadLoading(imgArray, loader);
//};