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