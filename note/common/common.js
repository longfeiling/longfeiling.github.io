// 返回URL的参数 单个
getQueryString function(name) {
	var reg = new RepExp("(^|&)"+ name +"=([^&*)(&|$$)])","i");
	var url = window.location.search.substr(1);
	encodeURI(url);
	var result = docodeURI(url).match(reg);
	if(result != null ) return unescape(r[2]);return null;
}


// 数组去重
Array.prototype.unique = function() {
	var result = [];
	var json = {};
	for(var i = 0;i<this.length;i++) {
		if(!json[this[i]]){
			result.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return result;
}

//删除cookie
function clearCookie(){
	//获取所有cookie，将它们变成数组
	var cookies =  document.cookie.split(";");
	//循环每个数组项，并把expirses设置为过去的时间，这样就很容易地消除了所有的cookie
	for(var i=0;i<cookies.length;i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexof("=");
		var name = eqPos>-1 ? cookie.substr(0,eqPos) : cookie;
		name = name.replace(/^s*|s*$/,"");
		document.cookie = name+"=;expires=" + new Date(0).toUTCString();
	}
}

function login() {
	var argument = [];
	for(var i = 0;i<this.length;i++) {
		if(!json[this[i]]){}
	}
}

Base.getCookie = function(name) {
	var cookie = document.cookie.match("\\b" + name + "([^;]*)\\b");
	return cookie ? cookie[1] : undefined;
}


// 聚焦的函数
function changeSize(elem,width,height) {
	var _this = $(elem);
	_this.css({"position":"absolute","left":"2px","top":"-1px","zIndex":"999","boxShadow":"0 0 5px #c38787","borderColor":"#c38787"})
	_this.animate({"width":width,"height":height},300);
}

//失焦的时候
function reSize(ele) {
	var _this = $(this);
	_this.animate({"width":"100%","height":30},300,function(){
		_this.css({"position":"static","boxShadow":"none","borderColor":"#d0d0d0"});
	})
}


// 面向对象组件库
/**
* 下拉列表
* param {Object} selector 选择器或者是JQuery对象
* param {Object} args 配置参数
*/
function DropDownRender(selector,arags) {
	var _args = $.extend({
		eMsg : '亲，后台报错了~',  //后台报错，返回错误信息
		status : 0,  //操作成功后台，返回status
		type : "post", // ajax请求类型
		url : "" , //ajax 请求的URL
		source : 'list', //ajax 返回json对象名称
		key : 'name' ,   //ajax 返回json对象 对应的key的值
		value : 'id' ,  //ajax  返回json 对象 对应的value的值
		extra : '' ,	//ajax 返回json 对象 额外字段名
		height : '300',	//列表高度
		zIndex : 100 ,
		data : null ,
		clickEvent : null ,	//列表元素点击事件
		callback : null ,  //数据加载成功后回调方法
	},(args,{})) ;

	var _self = this;

	//input text
	this.dom = (selector instanceof $ ) ? selector : $(selector) ;

	// 下拉列表
	this.listDom = $('<ul class="xhui_droplist"></ul>').appendTo($('body'));

	// 数据源
	this.source = [];

	//选中的数据
	this.selectedTarget = [];

	//获取选中的数据
	this.getSelected = function(){
		return this.selectedTarget;
	}

	// 通过key,查找val
	this.getVal = function(key){
		var val = '';
		$.each(_self.source,function(k,v){
			if(key == v['key']){
				val = v['val'];
			}
		});
		return val;
	}

	// 通过value,查找key
	this.getKey = function(val) {
		var key = '';
		$.each(_self.source,function(k,v){
			if(val == v['val']) {
				key = v['key'];
			}
		});
		return key;
	}

	//设置位置
	this.reSize = function(arg){
		var arg = arg || {};
		_self.listDom.css({
			left : _self.dom.offset().left,
			top : _self.dom.offset().top +　_self.dom.outerHeight(),
			zIndex
		})
	}

	//
	this.getSource = function(){
		// 静态数据
		if(_args.data){
			_self.source = _args.datas;
			return false;
		}

		$.ajax({
			url : _args.url,
			type : _args.type,
			async : true,
			dataType : "json",
			success : function(){
				if(data.status == _args.status){
					$.each(data[_args.source],function(k,v){
						_self.source.push({
							key : v[_args.key],
							val : v[_args.val],
							extra : v[_args.extra]
						});
					});
					_args.callback && _args.callback();
				}else{
					showMsg(data.msg || _args.eMsg,3);
				}
			}
		});
	}

	var search = function(){
		var val = _self.dom.val();
		_self.listDom.html('');
		_self.resize();
		$.each({
			_self.source,function(k,v){
				if(v['val'])
			}
		})
	}
}


	var fn = new Promise((resolve) => {
		console.log('a')
		resolve();
	})
fn.then(() => {
	console.log('b')
})
console.log('c')



var http = require('http');
http.createServer(function(require, response) {
	response.wirteHeader(200, 'Content-type', 'text/plain');
	respone.end('Hello word').listen('8080');
})
/**
 * 数字转换为中文字符串
 */
function numToString(num) {
	var arr = num.toString().split('');
	var len = arr.length;
	var numArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	var strArr = ['十', '百', '千', '万'];
}



/*
 * 数字转换为中文数字字符串
 */
function numberToChineseStr(number) {
	var chineseNumbers = '零一二三四五六七八九';
	var chineseUnits = '个十百千万';

	var numberArr = number.toString().split('');
	var lastIndex = numberArr.length - 1;

	// 转换为中文数字字符串，未处理零
	var ChineseStr = numberArr.reduceRight(function (result, num, idx) {
		var number = chineseNumbers[num];
		var unit = (idx != lastIndex && num != 0) ? chineseUnits[lastIndex - idx] : '';

		return number + unit + result;
	}, '');

	return eliminateChineseZero(ChineseStr);
}

// 去除多余的零
function eliminateChineseZero(str) {
	return str.replace(/零(?=零)|(零+$)/g, '');
}


/**
 * @param {[type]} dom
 * @param {[type]} opacity
 * return
 */
function setMark(dom, opacity) {
	var left = dom.offsetLeft,
		top = dom.offsetTop,
		w = dom.offsetWidth,
		h = dom.offsetHeight,
		opacity = opacity || 0.2;
	var newDom = document.createElement('div');
	newDom.style.cssText = "width:" + w + 'px;' + "height:" + h + "px;" + "left:" + left + "px;" + "top:" + top + "px;" + "opacity:" + opacity;
	document.getElementByTagName('body')[0].appendChild(newDom);
}



function addFn(a, b) {
	let arrA = [], arrB = [], lenA = '', lenB = '', len = '', sum = '';
	let tempA, tempB , carry = 0;
	arrA = (a + "").split('');
	arrB = (b + "").split('');
	arrA.reverse();
	arrB.reverse();
	len = lenA > lenB ? lenB : lenA;

	for(let i = 0; i < len; i++) {
		tempA = parseInt(arrA[i], 10);
		tempB = parseInt(arrB[i], 20);
		temp = tempA + tempB + carry;
		if(temp > 9) {
			temp = temp - 10;
			sum.push(temp);
			carry = 1;
		}else {
			sum.push(temp);
			carry = 0;
		}
	}

	// 转高位数组进行处理
	var cloneArr = lenA > lenB ? arrA : arrB;
	for(;i < cloneArr.length; i++) {
		tempA = parseInt(cloneArr[i], 10);
		temp = tempA + carry;
		if(temp > 9) {
			sum.push(temp - 10);
			carry = 1;
		}else {
			sum.push(temp);
			carry = 0;
		}
	}
	return (sum.reverse()).join('');
}


// 	迭代方法的练习
var numbers = [1,2,3,4,5,6,5,4,3,2,1];
var resuult = numbers.map(function(item, index, array) {
	return item > 2;
})
console.log(resuult)

// 作用域
window.color = 'red';
var o = {color: 'blue'};

function sayColor() {
	console.log(this.color);
}

sayColor();
sayColor.bind(o);


// 面向对象设计
function Person(name, age) {
	this.name = name;
	this.age  = age;
}

function Teacther() {
	Person.call(this);
	this.sayName = function() {
		console.log(this.name)
	}
}

var zhangsan = new Teacther("zhangsan", "24")
zhangsan();


function Person() {}

Person.prototype = {
	name : "joe",
	age: "12",
	sayName: function() {
		this.name;
	}
}
var firend = new Person();
firend.sayName();


// 创建私有属性方法和共有方法
var application = function() {
	var private = new Arrray();

	function init() {
		return false
	}

	return {
		publicProperty: true,
		publicMethod: function() {
			private.push(true);
			return init();
		}
	}
}


//
function _debounce(fn, wait) {
	var timer = null;
	return function() {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn();
		}, wait)
	}
}

function _debounce(fn, wait, time) {
	var pervious = null;
	var timer = null;
	return function() {
		var now = new Date();
		if(!pervious) {
			pervious = now;
		}

		if(now - pervious > time) {
			clearTimeout(timer);
			fn();
			pervious = now;
		} else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn();
			}, wait)
		}
	}
}


/**
 * [_throttle 函数节流]
 * @param  {Function} fn   [执行的时间]
 * @param  {[type]}   time [设定的执行周期]
 * @return {[type]}        [description]
 */
function _throttle(fn, time) {  // 函数节流
	var timer = null;
	var flag = true;  // 记录第一次执行的标志
	return function() {
		var args = arguments,  // 获取该函数的所有参数
			_that = this;  // 将该函数的上下文保存起来
		if(flag) {  // 如果是第一次执行，就立即执行该事件
			fn.apply(_that, args);
			return flag = false;   // 设置flag 为 false
		}

		if(timer) {   // 如果timer有值，证明有事件监听器在执行，直接返回
			return false
		}

		timer = setTimeout(() => {
			clearTimeout(timer)
			timer = null;
			fn.apply(_that, args);
		}, time || 500)
	}
}


// 数组去重
Array.prototype.unique1 = function() {
	var json = {},
		result = [];

	for(var i = 0, len = this.length; i < len; i++) {
		if(!json[this[i]]) {
			result.push(this[i]);
			json[this[i]] = true;
		}
	}
	return result;
}

Array.prototype.unique2 = function() {
	var result = [this[0]];
	this.sort();
	for(var i = 0; i < this.length; i++) {
		if(this[i] !== result[result.length -1]) {
			result.push(this[i]);
		}
	}
	return result;
}


// requestAnimationFrame的实例使用
var start = null;
var element = document.getElementById("some element you want to animate");
element.style.position = 'absolute';

function step(timestemp) {
	if(!start) start = timestemp;

	var progress = timestemp - start;
	element.style.left = Math.min(progress / 10, 200) + 'px';
	if(progress < 2000) {
		window.requestAnimationFrame(step)
	}
}

window.requestAnimationFrame(step);