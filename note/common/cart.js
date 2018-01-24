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
salesOffice.clientList = [];  // 定义缓存列表

salesOffice.listen = function(key, fn) {
	if(!this.clientList[key]) {  // 如果还没有订阅过此类信息，给该类消息创建一个缓冲列表？
		this.clientList[key] = [];
	}
	this.clientList[key].push(fn)  // 订阅的消息添加到消息缓存列表
};

salesOffice.trigger = function() {  // 发布信息
	var key = Array.protoType.shift.call(arguments),  // 取出消息类型
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
var event = {
	clientList: [],
	listen: function(key, fn) {
		if(!this.clientList[key]) {
			this.clientList[key] = [];
		}
		this.clientList[key].push(fn);
	},
	trigger: function() {
		var key = Array.protoType.shift.call(arguments),
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


