// JavaScript Document
$(function(){
	//小标题切换
	$('a[class*=submenu]').click(function(e) {
		
        $(this).siblings('a').removeClass('active1');
		$(this).addClass('active1');
		
    });
	$('.article').hide();
	$('.info-myPublish').hide();
	//返回动态列表
	$('#trends').click(function(){
		$('.content').show();
		$('.article').hide();
		$('.info-myPublish').hide();
	});
	//我的发表列表
	$('#myPublish').click(function(){
		$('.content').hide();
		$('.article').hide();
		$('.info-myPublish').show();
	});
});
//打开动态文章详情
function showDetail(){
	$('.content').hide();
	$('.article').show();
	$('.info-myPublish').hide();
}
