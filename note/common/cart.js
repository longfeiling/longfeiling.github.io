//激活优惠券
$("J_jihuo_coupons .txt").on('focus',function(){
	var _this = $(this);
	_this.siblings("a").removeClass('disable').addClass('btn_green');
});

//focus 之后没有填入东西，则要去掉btn_green
$("J_jihuo_coupons .txt").on('blur',function(){
	var _this = $(this);
	if(_this.val().length == 0 ) {
		_this.siblings("a").removeClass("btn_green").addClass('disable');
	}
});

$("J_jihuo_coupons .txt").find("a").on("click",function(){
	var _this = $(this);
	if(_this.hasClass("disable")) {return;}

	$.post("/redeem_coupon/?_rand="+Math.random(),{
		_xsrf:Base.getCookie("_xsrf"),
		gift_code:$("J_jihuo_coupons .txt").val()
	},function(data){
		var status = data.status,
			msg = data.msg || "兑换失败，请检查兑换是否正确";
		if(status == 0) {
			showMsg("兑换成功");
			window.location.reload();
		}else{
			showMsg(msg,"coupons_code");
		}
	})
})

//使用钱币
$('J_use_coin').on('click',function(){
	$('#J_user_coin_tag').val(1);
	vat _this = $(this);
	getGoodsForList(function(){
		showMsg("使用成功！");
		setTimeout(function(){
			var tpl = $("J_coin_used").html()+'<a class="J_cancel_coin" href="javascript:;">取消使用</a>';
			_this.parents("J_fuli_item").find("J_user_coin_tag").html(tpl);
			_this.parents("item_content").hide(500,function(){
				_this.parents(".fuli").removeClass("show");
			})
		},1000);
	});
})

//取消使用的荷币
$('.J_cancel_coin').on('click',function(){
	$("#J_user_coin_tag").val(0);
	getGoodsForList(function(){
		showMsg("取消成功！");
		$(this).parents('J_coin_used').html("");
	})

})

//使用现金券
$('.J_fuli_item').on('click','.J_use_coupon',function(){
	var _this = $(this),
		id = _this.data(id);
	$.post("post/_bonus",{
		_xsrf : Base.getCookie('_xsrf'),
		coupon_id : id
	},function(data){
		var status = data.status,
			msg = data.msg || "";
		if(status === 0) {
			getGoodsForList(function(){
				showMsg('使用成功！');
				setTimeout(function(){
					var tpl = '<span class="J_used_coupon">'+$('J_coupon_used').html()+'<a class="J_cancel_coupon" href="javascript:;" data-id="'+id+'"></a></span>';
					_this.parents('.J_fuli_item').find('J_use_coupon').html();
					_this.parents('item.content').hide(500,function(){
						_this.parents(".fuli").removeClass("show");
					})
				},1000);
			})
		}
	})
})

//订单加减
$('.J_num_cart_add').on('click',function(){
	if($(this).hasClass("disable")){return;}
	var _this = $(this),
		orderTxt = _this.siblings(".J_num_cart_txt"),
		orderNum = parseInt(orderTxt.html()),
		orderId = $(".J_pro_num_btn_cart").data('product'),
		orderSize = $(".J_pro_num_btn_cart").data('size');
		$.post("/cart/change/_rand="+Math.random(),{
			_xsrf:Base.getCookie("_xsrf"),
			order_num : (orderNum+1),
			order_id : orderId,
			order_size : orderSize
		},function(data){
			var status = data.status,
				market_pirce = data.sum_price;
			if(status == 0) {
				orderNum++;
				orderTxt.html(orderNum);
				if(orderNum > 1){
					_this.siblings(".J_num_cart_reduce").removeClass("disable");
					getGoodList();
				}
			}else{
				showMsg(data.msg);
				_this.addClass("disable");
			}
		});
});





function getGoodList(callback){
	var piadByWallet = $("#J_use_cash").val() || 0,
		paidByHercoin = $("J_user_coin").val() || 0,
		paymentMethod = $(".J_radio_1.select").data("value") || 0;
	getPirceList(piadByWallet,piadByHercoin,paymentMethod,callback);
}

function getPirceList(piadByWallet,piadByHercoin,paymentMethod,callback) {
	var piadByWallet = piadByWallet,
		piadByHercoin = piadByHercoin,
		paymentMethod = paymentMethod;
	$.post("/order_consume_detail/?source=cart/_rand="+Math.random(),{
		_xsrf : Base.getCookie("_xsrf"),
		paid_by_wallet : piadByWallet,
		paid_by_hercoin : paidByHercoin,
		payment_method : paymentMethod

	},function(data){
		if(data.status === 0) {
			$('.J_price_list').html(data.data);
			var total_pirce = $(".J_price_list .J_t_price").html();
			$(".total_pirce .J_t_price").html(total_pirce);
			callback && callback();
		}else{
			showMsg(data.msg);
			setTimeout(function() {
				window.location.reload();
			},1000);
		}
	});
}




/**
 * 观察者模式
 *
 */
优点：
1. 在时间上解耦
2. 在模块对象之间解耦

var salesOffice = {}; // 定义售楼处
salesOffice.clientList = [];  // 定义缓存列表

salesOffice.listen = function(fn) {
	this.clientList.push(fn)
};

salesOffice.trigger = function() {  // 发布信息
	for(var i = 0, fn; fn = this.clientList[i++];) {
		fn.apply(this, arguments); // arguments 是发布消息的时候带上的参数
	}
}

salesOffice.listen(function(price, squraseMeter) { // 小明的订阅信息
	console.log("价格="+ price);
	console.log("squraseMeter="+ squraseMeter);
})

salesOffice.listen(function(price, squraseMeter) { // 小红的订阅信息
	console.log("价格="+ price);
	console.log("squraseMeter="+ squraseMeter);
})

salesOffice.trigger(2000, 88);
salesOffice.trigger(3000, 110);

//至此，一个简单的发布-订阅者模式就实现了，但是，现在有一个问题，就是没有订阅到的消息也发出去了，这样我们就要加一个key标识，让订阅者只订阅自己感兴趣的信息

var salesOffice = {}; // 定义售楼处
salesOffice.clientList = {};  // 定义缓存列表

salesOffice.listen = function(key, fn) {
	if(!this.clientList[key]) {  // 如果还没有订阅过此类信息，给该类消息创建一个缓冲列表？
		this.clientList[key] = [];
	}
	this.clientList[key].push(fn)  // 订阅的消息添加到消息缓存列表
	console.log("key=="+ key)
	console.log(this.clientList[key])
};

salesOffice.trigger = function() {  // 发布信息
	var key = Array.prototype.shift.call(arguments),  // 取出消息类型
		fns = this.clientList[key]; // 取出对应的回调函数的集合
	for(var i = 0, fn; fn = fns[i++];) {
		fn.apply(this, arguments); // arguments 是发布消息的时候带上的参数
	}
}

salesOffice.listen('squraseMeter88', function(price) { // 小明的订阅信息
	console.log("价格="+ price);
})

salesOffice.listen('squraseMeter110', function(price) { // 小红的订阅信息
	console.log("价格="+ price);
})

salesOffice.trigger('squraseMeter88', 2000);
salesOffice.trigger('squraseMeter110', 3000);

// 现在可以实现订阅自己感兴趣的事了


// 发布订阅模式的通用实现
// 在这里要注意，clientList是可以用字符串做下标的，之前给人质疑说我这里定义错了
var event = {
	clientList: [],
	listen: function(key, fn) {
		if(!this.clientList[key]) {
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);
	},
	trigger: function() {
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key];

		if(!fns || fns.length === 0) {  // 如果没有绑定对应的信息，就直接return
			return false;
		}

		for(var i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments);
		}
	}
}
// 在定义一个installEvent函数
// 动态给所有对象实现发布-订阅功能
var installEvent = function(obj) {
	for(var i in event){
		obj[i] = event[i];
	}
}

// 测试
var salesOffice = {};
installEvent(salesOffice);

salesOffice.listen('squraseMeter88', function(price){
	console.log("price="+price)
})

salesOffice.listen('squraseMeter110', function(price){
	console.log("price="+price)
})

salesOffice.trigger('squraseMeter88', 2000)
salesOffice.trigger('squraseMeter110', 3000)




# 取消订阅的事件
var event = {
	clientList: [],
	listen: function(key, fn) {
		if(!this.clientList[key]) {
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);
	},
	trigger: function() {
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key];

		if(!fns || fns.length === 0) {  // 如果没有绑定对应的信息，就直接return
			return false;
		}

		for(var i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments);
		}
	}
}

event.remove = function(key, fn) {
	var fns = this.clientList[key];

	if(!fns) {  // 如果key对应的消息没有人订阅，直接返回
		return false;
	}
	if(!fn) { // 如果没有传入具体的回调函数，表示需要取消key对应的所有订阅
		fns && fns.length = 0;
	}else {
		for(var l = fns.length-1;l >= 0 ; l--) { // 反向遍历订阅的回回调函数列表
			var _fn = fns[l];
			if(_fn === fn) {
				fns.splice(l, 1); // 删除订阅者的回调函数
			}
		}
	}
}


function fn() {
	var result = new Array();

	for(var i = 0; i<5; i++) {
		result[i] = function() {
			return i;
		}
	}
	return result;
}
var arr = fn();
var a1 = arr[0];
console.log(a1())


function fn() {
	var result = new Array();
	for(var i=0; i < 5; i++) {
		result[i] = (function(num){
			return function() {
				return num;
			}
		})(i);
	}
}

window.id ="window";
document.getElementById("div1").onclick = function() {
	alert(this.id)  // div1
	var callback = function() {
		alert(this.id) // 这里callback作为了普通函数调用，所以this指向window全局执行环境
	};
	callback();
}
// 可以用一个变量保存对div节点的引用
document.getElementById('div1').onclick = function() {
	alert(this.id);
	var that = this;
	var callback = function() {
		alert(that.id);
	}
	callback();
}
// 在定义一个installEvent函数
// 动态给所有对象实现发布-订阅功能
var installEvent = function(obj) {
	for(var i in event){
		obj[i] = event[i];
	}
}

// 测试
var salesOffice = {};
installEvent(salesOffice);

salesOffice.listen('squraseMeter88', fn1 = function(price){
	console.log("price="+price)
})

salesOffice.listen('squraseMeter110', fn2 = function(price){
	console.log("price="+price)
})

salesOffice.trigger('squraseMeter88', 2000)
salesOffice.trigger('squraseMeter110', 3000)

salesOffice.remove('squraseMeter88', fn1);



// 网站实例
login = {
	list: [],
	listen: function(key, fn) {
		if(!list[key]) {
			this.list[key] = [];
		}
		this.list[key].push(fn);
	},
	trigger: function() {
		var key = Array.prototype.shift.call(this);
		var fns = this.list[key];
		if(!fns) {
			return;
		}

		for(var i = 0, fn = fns[i++]) {
			fn.apply(this, arguments);
		}
	}
}


// 闭包
function addFn() {
	var num = 0;
	return function() {
		num ++;
		console.log("num=="+num)
	}
}
var add = addFn();
add();
add();

// 通用的事件绑定事件
function addEvent(dom, type, handler) {
}

// this 作用域
var name = "hahah";
var aPerson  = {
	name : "lalal",
	friend: {
		name: "yayay",
		showName: function() {
			console.log(this.name);
		}
	}
}
aPerson.friend.showName.call(aPerson)
aPerson.friend.showName();
var show = aPerson.friend.showName;
show();

console.log(aPerson.friend)
console.log(aPerson.friend.showName.call(aPerson))

var name = "hahah";
var aPerson = {
	name: "lala",
	friend: {
		name: "yyaa",
		showName: function() {
			return function() {

			}

		}
	}
}


var show = aFamousPerson.friend.showName();
show();  // Bill Gates
aFamousPerson.friend.showName.call(aFamousPerson) // "Steve Jobs"
aFamousPerson.showName(); // Mark Zurkerberg



var dom = document.getElementById("ulItem");

dom.addEventListener('click', function(event) {
	var event = event || window.event;
	var target = event.target || event.srcElement;
	if(target == "LI") {
		alert(target.screenX);
		alert(target.screenY);
		alert(target.html);
	}
})



// 判断类型
var type = function(o) {
	var s = Object.prototype.toString.call(o);
	return s.match(/\[object(.*?)\]/)[1].toLowerCase();
}
type({});


// 在上面的基础上，加上专门判断某种类型数据的方法
var type = function(o) {
	var s = Object.prototype.toString.call(o);
	return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
 'Undefined',
 'Object',
 'Array',
 'String',
 'Number',
 'Boolean',
 'Function',
 'RegExp'
].forEach(function (t) {
  type['is' + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});

console.log(type.isObject({}))
console.log(type.isNumber(NaN))


// Array
var a = [1,2,3];
var b = [4,5,6];
Array.prototype.push.apply(a,b)  // a.push.apply(a,b)
console.log(a)

// push 向对象添加元素
var a = {a: 1};
[].push.call(a,2);
[].push.call(a, [3])
a;


// join
var a = [1,2,3,4];
a.join(' ');

// concat 多个数组的合并，将新数组添加到原数组的后部，返回一个新数组，原数组不变
['hello'].concat(['world','!']);

// slice 取得数组中的部分数组，返回一个新数组，不会影响到原数组
// slice 的一个重要的应用是将类似数组的对象转为真正的对象
Array.prototype.slice.call({0:'1', 1: '2', length: 2});
Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments)

// splice 用于删除原数组的一部分成员，并可以在删除的位置添加入新的数组成员，返回值是删除的数组，注意，原数组会改变
arr.splice(index,count_to_remove,addElement1,addElement2,..)

var a = [1,3,4,5,6,7];
a.splice(4,2);
console.log(a)


// exec();  返回匹配结果，如果匹配，返回一个数组，成员是每一个匹配成功的子字符串，否则返回null
var s = '_x_x';
var r = /_(x)/;
r.exec(s)

var r = /a(b+)a/g;
var a1 = r.exec('_abbba_aba_');
a1


// 利用g修饰符允许多次匹配的特点，可以用一个循环完成全部匹配
var s = /a(b+)a/g;
var r = '_abbba_aba_';

while(true) {
	var match = s.exec(r);
	if(!match) break;
	console.log(match[1])
}

var myList = document.getElementByTagNames('ul')[0];
var deepList = myList.cloneNode(true);
alert(deepList.ch)


var div = document.createElement('div');
div.className = "message";

var textNode = document.createTextNode('Hello world');
div.appendChild(textNode);

var anotherTextNode = document.createTextNode("another test!")
div.appendChild(anotherTextNode);

document.body.appendChild(div);

var newNode = element.firstChild.splitText(5);
alert(div.firstChild.nodeValue)
alert(newNode.nodeValue);

alert(div.childNodes.length);

alert(div.childNodes.length);
div.normalize();
alert(div.childNodes.length);
alert(div.firstChild.nodeValue);


var fragment = document.createDocumentFragment();
var ul = document.getElementById('myList');
var li = null;

for(var i = 0; i < 3; i++) {
	li = document.createElement('li');
	li.appendChild(document.createTextNode("item" + i));
	fragment.appendChild(li);
}
ul.appendChild(fragment);


function debounce(fn, time) {
	var timer = null;
	return function() {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn();
		}, time)
	}
}

function throttle(fn, time) {
	var timer = null,
		self = this,
		firstTime = true;

	return function() {
		var args = arguments,
			_this = this;
		if(firstTime) {
			self.apply(_this, args);	
			return firstTime = false
		}

		if(timer) {
			return false
		}

		timer = setTimeout(() => {
			clearTimeout(timer);
			timer = null;
			self.apply(_this, args)
		},time || 500)
	}
}


function foo() {
	setTimeout(() => {
		console.log("id:",this.id)
	},100)
}

var id = 12;
foo.call({id: 24}); // 24



function foo() {
	setTimeout(function() {
		console.log("id:",this.id)
	},1000)
}
var id = 12;
foo.call({id: 24})


function Timer() {
	this.s1 = 0;
	this.s2 = 0;

	setInterval(() => {
		this.s1++;
	},1000)

	setInterval(function() {
		this.s2++;
	},1000)
}

var timer = new Timer();
setTimeout(() => console.log("s1:",timer.s1), 3100)
setTimeout(() => console.log("s2",timer.s2), 3100)

foo::bar
// 等同于
bar.bind(foo)

foo::bar(...arguments)
bar.apply(foo,arguments);


var args = {
	"0": 'a',
	"1": 'b',
	"2": 'c',
	"3": 'd',
	length: 4
}
console.log(Array.prototype.slice.apply(args))


function aAajx(url) {
	var xhr = new XMLHttpRequest();
	
	xhr.onreadyStateChange = function() {
		if(xhr.statusState === 4) {
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

			}
		}
	}

	xhr.open("get",url,true);
	xhr.setRequestHeader("Accept", "json/application")
	xhr.send(); 
}


// 下面是sea.js的实例， 依赖就近 延迟执行
// A同事写的main.js  用sea.js 遵循CMD规范
define(function(require, export, module) {
	var oInput = document.getElementById("input1");
	var oDiv1 = document.getElementById("div1");
	var oDiv2 = document.getElementById("div2");
	var oDiv3 = document.getElementById("div3");

	require("./drag.js").drag(oDiv3);
	oInput1.onclick = function() {
		oDiv1.style.display = "block";
		require('./scale.js').scale(oDiv1, oDiv2);

		reuqire.asnyc('./scale.js', function(ex) {
			ex.scale(oDiv1, oDiv2)
		})
	}
} )

// B 同事写的drag.js
define(function(require, export, module) {
	function drag(obj) {
		var disX = 0;
		var disY = 0;
		obj.onmousedown = function(event) {
			var event = event || window.event;
			disX = event.clientX - obj.offsetLeft;
			disY = event.clientY - obj.offsetTop;
		}

		obj.onmousemove = function(event) {
			var event = event || window.event;

			var L = require('./range.js').range(event.clientX - disX, document.documentElement.clientWidth - obj.offsetWidth, 0);
			var T = require('./range.js').range(event.clientY - disY, document.documentElement.clientHeigth - obj.offsetHeight, 0)

			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
		};

		obj.onmouseup = function() {
			document.onmousedown = null;
			document.onmousemove = null;
		};

		return false;
	}

	export.drag = drag;
})

// C同事写的scale.js
define(function(require, export, moudlue) {
	function scale(obj1, obj2) {
		var disX = 0;
		var disY = 0;
		var disW = 0;
		var disH = 0;
	}
})




// requireJS的实例 AMD 依赖前置，提前执行
// require.config 是用来定义别名的，在path属性下配置别名，然后通过requirejs(参数一)
// 

// main.js
require.config({
	paths：{
		jquery: 'jquery.main' // 可以省略.js
	}
})
// 引入模块，利用$表示jquery
reuqire(['jquery'],function($) {
	$('body').css('background-color', 'red');
})
// 引入的模块也可以直接只写require。requirejs是通过define定义模块的
// define 模块
define(['jquery'], function($) {
	return {
		add: function(x, y) {
			return x + y;
		}
	}
})

//将模块命名为main.js
define(['jquery', 'math'],function($,math) {
	console.log(math.add(10, 200)) // 210;
})

// 如果一个模块没有依赖其他模块
define(function() {
	return {
		name: 'haha',
		age: 23
	}
})
// AMD 规范推荐的风格是返回一个对象作为模块对象。
// commonJS 的风格是通过对module.exports , exports 的属性赋值来达到暴露对象的目的
// 
