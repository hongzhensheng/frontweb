$(document).ready(function() {
	var re = /^1\d{10}$/; //校验号码是否正规
	var ch = /^[\u4e00-\u9fa5]{2,5}$/; //校验姓名时候为 2-5个字符
	var cq = /^[0-9]{5,11}$/;
	var $name, $phone, $qq;
	$("#apply").bind('click', function() {
		$name = $("#name").val();
		$phone = $("#phone").val();
		$qq = $("#qq").val();

		if ($name == NaN || $name == '') {
			alert("姓名不能为空!");
		} else if (!ch.test($name)) {
			alert("姓名格式不正确!");
		} else if ($phone == NaN || $phone == '') {
			alert("电话号码不能为空!");
		} else if (!re.test($phone) || $phone == '11111111111' || $phone == '12345678901') {
			alert("电话号码格式不正确!");
		} else {
			if ($qq == NaN || $qq == '') {
				apply($name, $phone, $qq, "", 'java');
			}else{
				if (!cq.test($qq))
					alert("QQ号码格式不正确!");
				else apply($name, $phone, $qq, "", 'java');
			}

		}
	});

	function apply(name, phone, qq, address, type) {
		var murl = "http://www.toceansoft.com/tuiguang/Apply?";
		var mdata = {
			"name": name,
			"phone": phone,
			"qq": qq,
			"address": address,
			"type": type
		};
		$.ajax({
			type: "post",
			url: murl,
			data: mdata,
			timeout: 10000,
			/*contentType:"application/x-www-form-urlencoded; charset=utf-8",*/
			success: function(str) {
				if (str == '200') {
					alert("申请成功!");
				} else {
					alert("申请失败!")
				}
			},
			error: function(str) {
				alert("发送请求异常,申请失败!"); //tips
			},
			async: false
		});
	};
});