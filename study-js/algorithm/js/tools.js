function drawLine(n) {
	var str = "";
	for(var i = 0; i < n; i++) {
		str += "&nbsp;&nbsp;";
	}
	return str;
}

function write(str) {
	document.write(str);
}
/*获取路径参数*/
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}