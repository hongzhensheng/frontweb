function setCookie(name, value) //兩個參數，一個是cookie的名字，一個是值
{
	var Days = 30; //此 cookie 將被保存30天
	var exp = new Date(); //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) //取cookies函數       
{
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if(arr != null) {
		return unescape(arr[2]);
	}
	return null;
}

function delCookie(name) //刪除cookie
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}

function setCookie2(name, value) //cookies设置
{
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	if(expires != null) {
		var LargeExpDate = new Date();
		LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
	}
	document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}

function getCookie2(Name) //cookies读取
{
	var search = Name + "=";
	if(document.cookie.length > 0) {
		var offset = document.cookie.indexOf(search);
		if(offset != -1) {
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if(end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring(offset, end));
		} else {
			return "";
		}
	}
}