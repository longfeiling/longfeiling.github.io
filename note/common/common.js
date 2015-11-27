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

