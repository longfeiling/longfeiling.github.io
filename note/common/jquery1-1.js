// jquery如何返回一个正确的实例
var aQuery = function(selecter,context) {
	return aQuery.prototype.init();
}
aQuery.prototype = {
	init : function(){
		return this;
	},
	name : function(){},
	age : function(){}
}
aQuery();

//init的this是指向aQuery类的，如果是要将init构造器，内部的this要如何处理
var aQuery = function(selecter,context) {
	return aQuery.prototype.init();
}
aQuery.prototype = {
	init : function() {
		this.name = "long",
		this.age = "18"
		return this;
	},
	name : function(){},
	age :　20
}
aQuery().age

//jquery框架分隔作用域的处理,通过实例init函数，每次都构建新的实例对象，来分隔this，避免交互混淆
jQuery = function(selecter,context) {
	return jQuery.fn.init(selecter,context,rootjQuery);
}

// 怎么访问jquery类原型上的属性和方法？做到既能隔离作用，还能使用就query原型对象的作用域？
// 关键点是用过原型传递，把jquery的原型传递给jQuery.prototype.init.prototype
jQuery.fn.init.prototype =  jQuery.fn;  //换句话来说就是jquery的原型对象覆盖了init构造器的原型对象


var a = 1;
setTimeout(function(){
	a++;
},1000)
alert(a)   //1

var a=1;
var b = function(callback) {
	setTimeout(function(){
		a++;
	},1000);
};
b(function(){
	alert(a);   //2
})

// 构造一个异步对象
function aaa(callback) {
	setTimeout(function(){
		callback(5);
	},1000);
}
function done(value){
	alert(value);
}

aaa(function(value){
	done(value);
})


// 闭包的应用：函数作为返回值，函数作为参数传递
// 1.函数作为返回值的栗子
function fn() {
	var max = 10;
	return  function bar(x) {
		if(x>max) {
			console.log(x);
		}
	}
}
var f1 = fn();
f1(15);   //输出15

// 2.函数作为参数传递




function checkoutPalindrom(str) {
	return str = str.split('').reverse().join('');
}
checkoutPalindrom("hello you hello");

function uniqueFn(arr) {
	var json = {}, newArr = [];
	for(var i = 0; i < arr.length; i ++ ) {
		if(!json[arr[i]]) {
			newArr.push(arr[i]);
			json[arr[i]] = true;
		}
	}
	return newArr;
}


function findMaxDuplicateChar(str) {
	if(str.length == 1) {
		return str
	}

	let charObj = {};
	for(let i = 0; i < str.length; i ++) {
		if(!charObj[str.charAt(i)]) {
			charObj[str.charAt(i)] = 1;
		} else {
			charObj[str.charAt(i)] += 1;
		}
	}
	let maxChar = '',
			maxValue = 1;
	for(var k in charObj) {
		if(charObj[k] > maxValue) {
			maxChar = k;
			maxValue = charObj[k];
		}
	}
	return maxChar;
}

function swap(a, b) {
	// 不借助临时变量 将两个整数交换、
	// a = a + b
	b = b - a;
	a = a + b;
	b = a - b;
	return [a, b]

}
