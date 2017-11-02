## 前言
es6的新语法已经出来很久了，平时用的最多的就是箭头函数还有变量的定义。对于展开运算符则是很少用，今天看到的一篇文章讲的展开运算符的妙用，相见恨晚。所以将这几个用处记录下来。多看多用。

### 替代Apply的函数调用
平时经常用Function.prototype.apply，传递一个数组作为参数，使用数组中存放的一组参数调用函数。
```
function doSomething(x, y, z) {}
var args = [0, 1, 2];

// 调用函数
doSomething.apply(null, args)

```
采用展开运算符我们能够避免使用aply的同时，轻易调用函数。只需在数组加上展开运算符即可。
```
doSomething(...args)
```
使用...使代码变得更加简短清晰。并且不用多余的null

### 合并数组
最喜欢用来合并数组，跟我们带来一种全新的方式
```
arr1.push(...arr2)  // 将arr2追加到arr1数组的末尾
arr1.unshif(...arr2)  // 将arr2追加到arr1数组的开头
```
如果你想要整合两个数组，并且某个数组的特定位置上
```
let arr1 = [2,3];
let arr2 = [1,...arr1,4,5];

```
很精简，代码更少！

### 拷贝数组
拷贝数组，过去我们经常用Array.prototype.slice()来做，但是现在也可以用展开运算符：
```
let arr1 = [1,2,3];
let arr2 = [...arr1];
arr2.push(4);
console.log(arr2)  // 1,2,3,4
```
注意：数组中的对象依然是引用值，所以不是任何东西都拷贝过去

### 将arguments 或者NodeList 转化为Array
像拷贝数组一样，我们经常使用Array.prototype.slice和arguments这种类数组对象转化为真正的数组。但是我们现在用展开运算符就可以做到
```
[...document.querySelectorAll('myDiv')]
```
使用此法，甚至可以像数组一样获取参数
```
let myFn = function(...args) {}
```

### 使用Math函数
```
let numbers = [1,2,3,4,5,6,7];
Math.min(...numbers)
```

### 解构
展开运算符用于解构更会一种超级好用的方法。使用解构和展开运算符将信息解压到你想要的变量中去
```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```