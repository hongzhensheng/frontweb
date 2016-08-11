// JavaScript Document
var imgArray = [
	"images/bg1.jpg",
	"images/arrow.png",
	"images/music_open.png",
	"images/music_close.png",
	"images/page1_board.png",
	"images/page1_draw.png",
	"images/page1_hand.png",
	"images/page1_title.png",
	"images/page1_theme.png",
	"images/page1_title2.png",
	"images/page1_logo.png",
	"images/bg2.jpg",
	"images/page2_circle.png",
	"images/page2_food.png",
	"images/page2_title.png",
	"images/page2_beijing.png",
	"images/page2_shanghai.png",
	"images/page2_shenzhen.png",
	"images/page2_guangzhou.png",
	"images/logo.png",
	"images/bg3.jpg",
	"images/page3_circle.png",
	"images/page3_title.png",
	"images/page3_one.png",
	"images/page3_one4.png",
	"images/page3_one3.png",
	"images/page3_one2.png",
	"images/page3_one1.png",
	"images/page3_three.png",
	"images/page3_three4.png",
	"images/page3_three3.png",
	"images/page3_three2.png",
	"images/page3_three1.png",
	"images/bg4.jpg",
	"images/page4_circle.png",
	"images/page4_title.png",
	"images/page4_distance.png",
	"images/page4_line1.png",
	"images/page4_distance4.png",
	"images/page4_distance3.png",
	"images/page4_distance2.png",
	"images/page4_distance1.png",
	"images/page4_time.png",
	"images/page4_line2.png",
	"images/page4_time4.png",
	"images/page4_time3.png",
	"images/page4_time2.png",
	"images/page4_time1.png",
	"images/bg5.jpg",
	"images/page5_circle.png",
	"images/page5_computer.png",
	"images/page5_title.png",
	"images/page5_path.png",
	"images/page5_beijing.png",
	"images/page5_shenzhen.png",
	"images/page5_guangzhou.png",
	"images/page5_shanghai.png",
	"images/bg6.jpg",
	"images/page6_circle.png",
	"images/page6_title.png",
	"images/page6_tianxie.png",
	"images/page6_n1.png",
	"images/page6_tianping.png",
	"images/page6_n2.png",
	"images/page6_shuiping.png",
	"images/page6_n3.png",
	"images/page6_juxie.png",
	"images/page6_n4.png"/*,
	"images/bg7.jpg",
	"images/page7_circle.png",
	"images/page7_title.png",
	"images/page7_flag.png",
	"images/page7_n1.png",
	"images/page7_n2.png",
	"images/page7_n3.png",
	"images/page7_n4.png",
	"images/bg8.jpg",
	"images/page8_circle.png",
	"images/page8_title.png",
	"images/page8_beijing.png",
	"images/page8_shanghai.png",
	"images/page8_shenzhen.png",
	"images/page8_guangzhou.png",
	"images/bg9.jpg",
	"images/page9_circle.png",
	"images/page9_title.png",
	"images/page9_beijing.png",
	"images/page9_shanghai.png",
	"images/page9_shenzhen.png",
	"images/page9_guangzhou.png",
	"images/bg10.jpg",
	"images/page10_circle.png",
	"images/page10_title.png",
	"images/page10_guangzhou.png",
	"images/page10_shenzhen.png",
	"images/page10_shanghai.png",
	"images/page10_beijing.png",
	"images/bg11.jpg",
	"images/page11_title1.png",
	"images/page11_lagou.png",
	"images/page11_dd.png",
	"images/page11_tit.png",
	"images/page11_btn1.png",
	"images/page11_btn2.png",
	"images/share_cover.png"*/
];
// 资源加载
var Loader = function(){
	this.currProgress = 0;  // 当前加载进度
	this.isCompleted = false; // 判断是否加载完毕
	this.total = 100;  // 最大值100

	var loaded = 1;

	//var content = document.getElementById('content');
	var number = document.getElementById('number');
	//var w = document.getElementsByClassName('progress')[0].offsetWidth / 20;
	this.Loading = function(imgArray,success){
		var self = this;
		for( var i = 1 ; i < imgArray.length; i++ ){
			var ext = imgArray[i].substring(imgArray[i].lastIndexOf('.')).toLowerCase();
			if( ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif' ){
				var img = new Image();
				img.onload = function(){
					loaded ++;
					self.currProgress = loaded / imgArray.length * 100;
					//content.style.width = self.currProgress / 100 * w+"rem";
					//number.innerHTML = (self.currProgress).toFixed(1)+"%";
					console.log(number.innerHTML);
					if( loaded == imgArray.length ){
						success();  // 回调函数
					}
				};
				img.onerror = function(){
					loaded ++;
					if( loaded == imgArray.length ){
						success();  // 回调函数
					}
				};
				img.src = ctx + "/template/survivalReport/" + imgArray[i];
			}else{
				this.loadMusic(imgArray[i]);
			}
		}
	};
	this.loadMusic = function(path){
		$.ajax({
			type: 'get',
			url: path,
			data: {},
			async:false,   // false 同步  true  异步
			success: function (data) {
				loaded++;
				if( loaded == imgArray.length ){
					success();  // 回调函数
				}
				//console.log("success");
			},
			error: function (xhr, type)  {
				loaded++;
				if( loaded == imgArray.length ){
					success();  // 回调函数
				}
				//console.log('error');
			}
		})
	};
	this.success = function(){
		console.log("加载完毕");
		//$('.page').css({width:GC.w,height:GC.h});
		//$('.page1 .content').css({width:GC.w,height:GC.h});
		init.fnSwiper();
		$('.loading').addClass('hidden');
	};
	this.loadLoading = function(imgArray,obj){
		var img = new Image();
		img.onload = function(){
			obj.Loading(imgArray,obj.success);
		};
		img.onerror = function(){
			obj.Loading(imgArray,obj.success);
		};
		img.src = ctx + "/template/survivalReport/" + imgArray[0];
	};
};
//window.onload = function(){
	var loader = new Loader();
	loader.loadLoading(imgArray,loader);
//};