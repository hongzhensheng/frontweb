var scrMinHeight = 1; //滚动条最小高度  
var scrMaxHeight = 0; //滚动条最大高度  
var scrDefualtTop = 80; //滚动条默认位置  
var scrHeight = 0;
//初始化滚动条  
function InitScroll() {
	scrMaxHeight = $("#mainScrollContent").height(); //文本框高度  
	scrHeight = document.getElementById("mainScrollContent").scrollHeight; //滚动文本高度  
	scrHeight = parseInt((scrMaxHeight / scrHeight) * scrMaxHeight);
	if(scrHeight <= scrMinHeight) {
		scrHeight = scrMinHeight;
	}
	if(scrHeight >= scrMaxHeight) {
		$("#scrollContent").hide();
	} else {
		$("#scrollContent").show();
		$("#scrollContent .tiao_mid").css("height", (scrHeight - 19) + "px");
	}
}

$(document).ready(function() {
	$(".bod").height(($(document).height() - 80) + "px");
	$("#mainScrollContent").height(($(document).height() - 125) + "px");
	scrMaxHeight = ($(document).height() - 125); //滚动条最大高度  
	$("#scrollBody").height(($(document).height() - 125) + "px");
	$("#scrollBodyBack").height(($(document).height() - 125) + "px");

	InitScroll();
	$("#mainScrollContent").scroll(function() {
		ChangeScroll();
	});
	var y1 = 0;
	$("#scrollContent").mousedown(function(event) {
		var scrContentTop = $("#scrollContent").css("top");
		y1 = event.clientY - parseInt(scrContentTop.replace("px", ""));
		$("#scrollContent").mousemove(function(event) {
			if((event.clientY - y1) < scrDefualtTop) {
				$("#scrollContent").css("top", scrDefualtTop + "px");
			} else if((event.clientY - y1) > (scrDefualtTop + scrMaxHeight - scrHeight)) {
				$("#scrollContent").css("top", (scrDefualtTop + scrMaxHeight - scrHeight) + "px");
			} else {
				$("#scrollContent").css("top", (event.clientY - y1) + "px");
			}
			ChangeScrollContent();
		});
	}).mouseup(function() {
		$("#scrollContent").unbind("mousemove");
	}).mouseout(function() {
		$("#scrollContent").unbind("mousemove");
	});
});

//改变滚动内容位置  
function ChangeScrollContent() {
	var scrTop = $("#scrollContent").css("top");
	var st = parseInt(scrTop.replace("px", ""));
	st = ((st - scrDefualtTop) * document.getElementById("mainScrollContent").scrollHeight) / scrMaxHeight
	$("#mainScrollContent").scrollTop(st); //滚动的高度  
}

//改变滚动条位置  
function ChangeScroll() {
	var scrTop = $("#mainScrollContent").scrollTop(); //滚动的高度  
	scrTop = (scrTop * scrMaxHeight) / document.getElementById("mainScrollContent").scrollHeight + scrDefualtTop;
	$("#scrollContent").css("top", scrTop + "px");
}