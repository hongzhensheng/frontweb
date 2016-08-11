/*--获取宽度--*/
//获取可视区宽度
function getWidth() {var width = window.innerWidth;if (typeof width != 'number') {if (document.compatMode == 'CSS1Compat') {width = document.documentElement.clientWidth;} else {width = document.body.clientWidth;}}return width;};
function jumpByPath(path) {window.location.href = "" + path;}
/*--跳转咨询客服--*/
function jump() {window.location.href='http://webim.qiao.baidu.com//im/index?ucid=5588133&siteid=7984914&bid=6393af4679d1ac077413a3be';};