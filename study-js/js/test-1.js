//下面是一个检查银行账户对象的构造函数
function Checking(amount) {
	this.balance = amount;
	this.deposit = deposit;
	this.withdraw = withdraw;
	this.toString = toString;
};
//存款
function deposit(amount) {
	this.balance += amount;
};
//
function withdraw(amount) {
	if (amount <= this.balance) {
		this.balance -= amount;
	}
	if (amount > this.balance) {
		console.log('Insufficient funds!-资金不足')
		alert('Insufficient funds!-资金不足');
	}
};
//
function toString() {
	return 'Balance:' + this.balance;
};

function aaa() {
	var NV = {};
	var UA = navigator.userAgent.toLowerCase();
	try {
		NV.name = !-[1, ] ? 'ie' :
			(UA.indexOf("firefox") > 0) ? 'firefox' :
			(UA.indexOf("chrome") > 0) ? 'chrome' :
			window.opera ? 'opera' :
			window.openDatabase ? 'safari' :
			'unkonw';
	} catch (e) {};
	try {
		NV.version = (NV.name == 'ie') ? UA.match(/msie ([\d.]+)/)[1] :
			(NV.name == 'firefox') ? UA.match(/firefox\/([\d.]+)/)[1] :
			(NV.name == 'chrome') ? UA.match(/chrome\/([\d.]+)/)[1] :
			(NV.name == 'opera') ? UA.match(/opera.([\d.]+)/)[1] :
			(NV.name == 'safari') ? UA.match(/version\/([\d.]+)/)[1] :
			'0';
	} catch (e) {};
	try {
		NV.shell = (UA.indexOf('360ee') > -1) ? '360极速浏览器' :
			(UA.indexOf('360se') > -1) ? '360安全浏览器' :
			(UA.indexOf('se') > -1) ? '搜狗浏览器' :
			(UA.indexOf('aoyou') > -1) ? '遨游浏览器' :
			(UA.indexOf('theworld') > -1) ? '世界之窗浏览器' :
			(UA.indexOf('worldchrome') > -1) ? '世界之窗极速浏览器' :
			(UA.indexOf('greenbrowser') > -1) ? '绿色浏览器' :
			(UA.indexOf('qqbrowser') > -1) ? 'QQ浏览器' :
			(UA.indexOf('baidu') > -1) ? '百度浏览器' :
			'未知或无壳';
	} catch (e) {}
	alert('浏览器UA=' + UA +
		'\n\n浏览器名称=' + NV.name +
		'\n\n浏览器版本=' + parseInt(NV.version) +
		'\n\n浏览器外壳=' + NV.shell);
};