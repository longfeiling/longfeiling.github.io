// JavaScript Document

$(document).ready(function(){
	$('#applyDiv').hide();
	$('#download').hide();
	$('#attention').hide();
	$('#detail').hide();
	//页面的切换
	
	//点击首页
	$('#showMain').click(function(e) {
        $('#download').hide();
		$('#attention').hide();
		$('#applyDiv').hide();
		$('#detail').hide();
		$('#main').show();
    });
	//点击公告
	$('#showAttention').click(function(e) {
        $('#download').hide();
		$('#main').hide();
		$('#detail').hide();
		$('#attention').show();
    });
	
	//点击文档下载
	$('#showDownload, .part1').click(function(e) {
        $('#main').hide();
		$('#attention').hide();
		$('#detail').hide();
		$('#download').show();
    });
	
	//点击申请按键，弹出申请框
	$('.apply').on('click',function(){
		$('#applyDiv').hide();
		
		var toggle=$(this).attr('toggle');
		$('.panel-heading').empty().append(toggle);
		
		$('#applyDiv').fadeIn();
		
		})
	//点击导航栏中的申请，弹出对话框
	$('#navApply li').click(function(e) {
		$('#download').hide();
		$('#attention').hide();
		$('#applyDiv').hide();
		$('#detail').hide();
		$('#main').show();
		var toggle=$(this).attr('toggle');
		$('.panel-heading').empty().append(toggle);
		
        $('#applyDiv').hide();
		$('#applyDiv').fadeIn();
    });
	
	$('.close,#cancel').click(function(e) {
        $('#applyDiv').hide();
    });
	
	
	$('.menu >li').hover(
	function(event){
	if(!$(this).find('ul').is(":animated"))
			$(this).find('ul').slideDown('slow').show();
			   
			},
		function(){
				$(this).find('ul').slideUp('slow');
			});

	});

	function showDetail(){
		
		$('#attention').hide();
		$('#detail').show();
		};