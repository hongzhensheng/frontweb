$.mobile.transitionFallbacks.slide = "none";
$(document).delegate("#pageone", "pageinit", function() {
	$(document).bind("pagebeforechange", beforechange);
});

function beforechange(e, data) {
	if (typeof data.toPage != "string") {
		var url = $.mobile.path.parseUrl(e.target.baseURI)
		var re = 'toc_mobile_teacher_info.html';
		if (url.href.search(re) != -1) {
			var page = $(e.target).find("#pagetwo");
			var d = data.options.data;
			var data = getUrlParam(url.href);

			page.find("#name").html(decodeURIComponent(data[0]));
			page.find("#content").html(decodeURIComponent(data[1]));
			page.find("#center_img").attr("src", decodeURIComponent(data[2]));

		}
	}
}

function getUrlParam(string) {
	var obj = new Array();
	if (string.indexOf("?") != -1) {
		var string = string.substr(string.indexOf("?") + 1);
		var strs = string.split("&");
		for (var i = 0; i < strs.length; i++) {
			var tempArr = strs[i].split("=");
			obj[i] = tempArr[1];
		}
	}
	return obj;
}

function goTo(page) {
	$.mobile.changePage(page, {
		transition: "flip"
	});
}

$(document).on("pagecreate", "#pageone", function() {
	$(document).on("scrollstart", function() {
		$("#overlayPanel").panel("close");
	});
});