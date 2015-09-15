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