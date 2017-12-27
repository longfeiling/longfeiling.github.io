## nodejs 与 commonjs 规范


## 模块的分类
* 核心模块   http fs path EventEmitter
* 文件模块   var util = require('./util.js')
*第三方模块   var promise = require("./promise")
##模块的流程
1. 创建模块   teacher.js
2. 导出模块   exports.add = function()｛｝
3，加载模块　 var teacher = require('./teacher.js')
4. 使用模块   teacher.add('Feeling')


## node.js API
>url
url{
	parse:Function('路径','query的返回的形式(true)',''),     //解析url的地址
	resolve:Function,
	resolveObject,
	format,
	Url,
}


> querystring 参数处理小利器
* querystring.stringify : 参数序列化
* querystring.parse: 参数反序列化
* querystring.escape: 参数转义
* querystring.unescape: 参数反转义


##http的知识

###什么是http
http客户端发起请求，创建端口，
http服务器在端口监听客服端请求
http服务器向客户点返回状态和内容

###http请求的过程
1. 浏览器搜索自身dns缓存
2. 搜索操作系统自身的dns缓存
3. 读取本地的host文件
4. 浏览器发起一个dns的系统调用
	1）宽带运营商服务器查看自身缓存
	2）运营商服务器发起一个迭代的dns解析的请求
		运营商服务器把结果返回操作系统内核同时缓存起来
5.浏览器获得域名对应的ip地址后，发起http'三次握手'


###请求&响应
请求和响应都包括http头和正文信息

http头: 发送的是一些附加信息：内容类型，服务器发送响应的日期，http状态码
正文信息： 就是用户提交的表单信息

请求方法：get,post,put,delete,head,trace,options ...

状态码



## node中的http模块
1. 什么是回调
2. 什么是同步/异步
3. 什么是I/O
4. 什么是单线程、多线程
5. 什么是阻塞，非阻塞
6.

## 事件循环
node.js是单进程单线程应用程序，但是通过事件和回调支持并发，所有性能非常高。
node.js的每一个API都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发
node.js基本所有的事件机制都是用设计模式中观察者模式实现的
node.js单线程类似进入一个while(true)的事件循环，直到没有事件观察者的退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数。

从规范上来来说，setTimeout有一个4ms的最短时间，不管你设定多少，最少都要间隔4ms才运行里面的回调。Promise的异步没有这个问题。Pormisede所在的那个异步队列优先级要高一些，Promise是异步的，是指它的then() 和 catch() 方法。Promise本身还是同步的，Promise的任务会在当前事件循环末尾执行，而setTimeout在下一个事件循环执行。
```
setTimeout(function() {
  console.log(4)
},0)
new Promise(function(resolve){
  console.log(1)
  for(var i = 0; i < 1000; i++) {
    i === 999 && resolve();
  }
  console.log(2)
}).then(function() {
 console.log(5)
})
console.log(3)

// 上面运行结果输出 12354
```

## EventEmitter
> EventEmitter 是一个对事件进行监听的对象，通俗来说就是为事件写回调函数，当触发一个事件执行后，会执行为该事件绑定的回调函数。
EventEmitter 的核心就是对事件触发器和事件监听器的封装
可以通过requie('events')来访问该模块
```
// 引入events 模块
var events = require('events');
// 创建EventEmitter对象
var eventEmitter = events.EventEmitter();
eventEmitter.on('some_event',function() {
  console.log("some_event事件的触发")
});
setTimeout(function() {
  eventEmitter.emit('some_event')
}, 1000)
```
EventEmitter的每个事件由一个事件名和若干个参数组成，事件名就是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter支持若干个监听器。
当事件触发的时候，注册到这个事件的监听器被依次调用，事件参数作为回调函数参数传递。
EventEmitter提供多个属性，如on和emit。on 用于绑定事件函数，emit用于触发事件。

```
// 通过connection（连接事件）演示EventEmitter类的应用
var events = require('events');
var emitter = new events.EventEmitter();

// 监听器1
var listener1 = function listener1() {
  console.log("监听器1执行")
}

var listener2 = function listener2() {
  console.log("监听器2执行")
}

// 绑定connection事件，处理函数为listener1
emitter.addListener('connection', listener1);

// 绑定connection事件，处理函数为listener2
emitter.addListener('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(emitter, 'connection');
console.log(eventListeners + "个监听器连接事件")

// 处理connection事件
emitter.emit('conntection')

// 移除绑定的listener1的函数
emitter.removeListener('connection', listener1);
console.log("listener1 不再受监听")

// 触发连接事件
emitter.emit('conntection')

var eventListeners = require('events').EventEmitter.listenerCount(emitter, 'connection');
console.log(eventListeners + "个监听器连接事件")

console.log("程序执行完毕")

```

### 错误事件
EventEmitter定义了一个特殊的事件error,它包含了错误的语义，我们在遇到异常的时候通常会触发error事件。
当error被触发的时候，EventEmitter规定如果没有响应的监听器，Node.js会把它当做异常，退出程序并且输出错误信息。
我们一般要为会触发error事件的对象设置监听器，避免遇到错误的时候导致整个程序崩溃。

### 继承EventMitter类
大多数我们不会直接使用EventEmitter，而是在对象中继承它。包括fs，net，http在内的，只要支持事件响应的核心模块都是EventEmitter的子类。
原因：
1. 具有某个实体功能的对象实现事件符合语义，事件的监听和发射应该是一个对象的方法。
2. Javascript的对象机制都是基于原型的，支持部分多重继承，继承EventEmitter不会打乱对象原有的继承关系。

## Stream流
Stream是一个抽象接口，Node中有很多对象实现这个接口。例如：对http服务器发送请求的request对象就是一个Stream对象。
Stream有四种流类型：
* Readable 可读操作
* Writable 可写操作
* Duplex 可读可写操作
* Tranform 操作被写入数据，然后读出结果
所有的Stream对象都是EventEmitter的实例。常用的事件有：
* data 当有数据可读的时候触发
* end 没有更多数据可读时触发
* error 在接收和写入过程发生错误时触发
* finish 所有数据已被写入到底层系统时触发

### 从流中读取数据
```
var fs = require("fs");
var data = '';

// 创建可读流
var readStream = fs.createReadStream('input txt')

// 设置编码为utf8
readStream.setEncoding('utf8');

// 处理流事件  --> data,end,error,finish
readStream.on('data', function(chunk) {
  data += chunk
})

readStream.on('end', function() {
  console.log(data)
})

readStream.on('error', function() {
  console.log(err.stack)
})

console.log("程序执行完毕")
```


## 模块系统
> 为了让node.js 的文件可以相互调用，node.js 提供了一个简单的模块系统
模块是node.js的一个基本组成部分，文件和模块是一一对应的。
node.js提供了exports和require两个对象，其中exports是模块公开的接口，require用于从外部获取一个模块的接口。


## node 全局对象
* __ filename
__ filename表示正在执行的脚本的文件名。它将输出文件所在位置的绝对路径吗，且和命令行参数所指定的文件名不一定相同。如果在模块中，返回的值是模块文件的路径。
* __ dirname  表示当前执行脚本所在的目录
* setTimeout(cb, ms)

### process
> process是用于描述node.js进程状态的对象，提供了一个与操作系统的简单接口。
process 的常用的成员方法：
* exit 当进程准备退出时触发
* beforeExit 当node清空事件循环，并且没有其他安排的时触发这个事件
* uncaughtException 当一个异常冒泡回到事件循环
* Sigcal 当进程接收到
