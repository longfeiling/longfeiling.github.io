## 前言 
在这之前看过很多其他博客描述闭包这个概念和实际的应用，对于它的理解有了一些大概的概念，今天再重复看书，将自己对闭包的理解记录下来，达到巩固理解的作用。

## 执行环境及作用域
说到闭包，首先要先说执行环境这个概念。执行环境定义了变量和函数有权访问的其他数据，决定了它们的行为。每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和方法都保存在这个对象中。虽然我们在代码中无法访问这个对象，但是解析器在后台使用它。全局执行环境就是我们所说的window对象，每一函数都有自己的执行环境，某个执行环境中所有的代码已经执行完毕，该环境就被销毁，保存在环境中的变量和方法也随之一同销毁（全局执行环境知道应用程序退出或者是关闭网页或者浏览器的时候才会被销毁）
每一个函数都以自己的执行环境，当执行流进入到一个函数之后，函数的环境就会被推入一个环境栈，在函数执行完了之后，栈将环境弹出，将控制权返回到之前的环境中。当代码在一个环境中执行的时候，会创建变量对象的一个作用域链。
### 作用域链
用途：保证对执行环境有权访问的所有变量和函数有序访问。作用域的前端，始终都是当前执行代码所在环境的变量对象。如果该环境是函数，就将起活动对象作为变量对象。活动对象在最开始只包括一个变量，即arguments对象（这个对象在全局对象中是不存在的）。下一个变量对象是包含的外部环境，全局执行环境的变量对象始终在作用域链的最末端。
内部环境可以通过作用域链访问所有的外部环境，但是外部环境不可以访问内部环境的任何一个变量和函数名。
			

### 活动对象的生存周期
一般来说，当函数执行完了之后，该执行环境就被销毁，该环境的局部活动对象也会被销毁，内存仅保存全局执行环境的变量对象，但是，如果函数形成闭包，即在函数中返回另外一个函数，而在这个函数中会将包含它（外部）的函数的活动对象添加到作用域链上，既然这个活动对象还在另外一个函数的作用域链下，所以它就没有被销毁，一直保存的内存中，直到该闭包函数被销毁。

## 闭包的形成特征
* 在一个函数中返回另外一个函数
* 在这个另外函数可以访问函数的局部变量和方法
* 这些局部函数和方法会一直保存在内存中

```
function fn() {
	var a = 1;
	return function() {
		a++;
		return a;
	}
}
var f = fn();
f();
f();
```

## 闭包的作用
1. 封装变量, 把一些不需要暴露在全局的变量封装成私有变量。
```
var mult = (function() {
	var cache = {};
	return function() {
		var args = Array.prototype.join.call(arguments, ',');
		if(cache[args]) {
			return cache[args]
		};
		var a = 1;
		for(var i = 0,len = arguments.length; i < len; i++) {
			a = a * arguments[i];
		}
		return cache[args] = a;
	}
})();
```
提炼函数是代码重构中一个常见的技巧。如果在一个大函数中有些代码能够独立出来，我们就可以将它封装在独立的小函数中，这样有利于函数的复用，独立的小函数如果有一个良好的命名，本身就起到了注释作用。如果这些小函数不需要在程序的其他地方中使用，最好是用闭包将它封装起来。
```
var mult = (function() {
	var caculate = function() { // 封闭caculate函数
		var a = 1;
		for(var i = 0, len = arguments.length; i < len; i++) {
			a = a * arguments[i];
		}
		return a;
	};

	return function() {
		var cache = {};
		var args = Array.prototype.join.call(arguments, ',');
		if(cache[args]) {
			return cache[args];
		}
		return cache[args] = caculate.apply(null, arguments);
	}
})();
```

2. 延续局部变量的寿命
```
var report = function(src) {
	var img = new Image();
	img.src = src
}
report('http://baidu.com/getUserInfo');
```
// 利用闭包将img变量封闭起来
```
var report = (function() {
	var imgs = [];
	return function(src) {
		var img = new Image();
		imgs.push(img);
		img.src = src;
	}
})();
```


## 闭包与内存管理
我们常说过度使用闭包会导致内存泄露，其实就是因为我们在闭包的使用过程中形成循环引用，如果闭包作用域链中保存着一些DOM节点，这个时候就可能会导致内存泄露。
要解决循环引用带来的内存泄露，我们需要把循环引用中的变量设为null
```
function assignHandler() {
	var element = document.getElementById('div');
	element.onclick = function() {  // 创建了闭包，这个闭包又创建了一个循环引用
		alert(element.id);
	}
}
```
可以通过下面代码来的解除循环引用，解决内存泄露
```
function assginHandler() {
	var element = document.getElementById('div');
	var id = element.id;  // 将elemnt.id的副本保存到一个变量中，解除循环引用
	element.onclick = function() {
		alert(id;)
	};

	element = null  // 解除对Dom对象的引用，解决内存泄露问题
}
```
注意：在上面代码中，单单将element.id的副本保存到变量中，解除循环引用并不能够解除内存泄露，因为闭包会引用包含函数的整个活动对象，而其中包含element，即使闭包中不直接使用element，所以有必要手动将element设置为null。


