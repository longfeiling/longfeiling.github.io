##前端安全问题主要是有两种
1. xss （corss site scripting）跨域脚本攻击
2. csrf (corss site request forgery) 跨站伪造请求
CSRF 的防御措施：
1. 检测http referer是否同域名
2. 避免登录的session长时间存储在客户端上
3. 关键请求使用验证码和token机制

##web安全-xss

###xss的定义
###xss的原理
攻击者向有XSS漏洞的网站中输入(传入)恶意的HTML代码，当其它用户浏览该网站时，这段HTML代码会自动执行，从而达到攻击的目的。如，盗取用户Cookie、破坏页面结构、重定向到其它网站等。
###xss的攻击方式
脚本的注入，dom的攻击
xss的攻击方式有两种方式
1.反射型
发出请求时，xss代码出现在url中,作为输入提交到服务器端，服务器端解析响应，xss代码随响应内容一起传回浏览器，最后浏览器解析xss.
简单例子：
在node.js 中用express 来作为整个应用的服务架构，-e 表示应用ejs来调用模板引擎，./ 表示当前目录
express -e ./
例：在url中 http://localhost:3000/?xss=%3Cimg%20src=%22null%22%20onerror=%22alert(1)%22%20/%3E
或者是：http://localhost:3000/?xss=<p onclick=%22alert('点我')>点我</p>
或者是；http://localhost:300/?xss=<iframe src="//baidu.com/t.html"></iframe>   实现将网址植入各种广告

<%- %> 前面是减号的就是不需要对内容进行转义，<%= %> 前面是减号的就是不需要对内容进行转义，
2.存储型
存储型与放射型的差别仅在于：提交的代码会存储在服务端（数据库，内存，文件系统等），下次请求目标页面时不用再提交xss代码

问题：存储型的攻击代码是怎么进入存储到服务端的呢？
###xss的防御措施
* 编码 html encode
对用户输入的数据进行html Entity编码,例如< 编码为 &lt; > 编码为&gt; " 编码为&quot;
```
// 转换部分字符
function changeChars(str) {
  swicth(str) {
    cace '&' :
      return "&amp;";
    cace '<' :
      return "&lt;";
    cace '>' :
      return "&gt;";
    cace '"' :
      return "&quot";
    cace ' ' :
      return "&nbsb;";
  }
}
```
* 过滤
移除用户上传的DOM属性，如onerror，onclick等
移除用户上传的stlye节点，Script节点，Iframe节点
使用cookie的httpOnly属性，加上了这个属性的cookie字段，js是无法进行读写的
* 校正
避免直接对htmL Entity解码
使用DOM Prase转换，校正不配对的DOM标签