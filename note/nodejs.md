##nodejs 与 commonjs 规范


##模块的分类
* 核心模块   http fs path 
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
