
$(function(){
	$('.invited').hide();
	$('.standup').hide();
	$('.demo').hide();
	$('#activeDetail').hide();
	
	//小标题切换
	$('a[class*=submenu]').click(function(e) {
		
        $(this).siblings('a').removeClass('active1');
		$(this).addClass('active1');
		
    });
	/*发起活动链接的点击事件*/
	$('#start').click(function(){
		$('#activeDetail').hide();
		$('.standup').show();
	});
	
	/*被邀请活动链接的点击事件*/
	$('#invited-by').click(function(){
		$('.invited').show();
		$('.events').hide();		
		$('.standup').hide();
	});
	
	/*我的活动链接的点击事件*/
	$('#activities').click(function(){
		$('.events').show();
		$('.invited').hide();
		$('.standup').hide();
		});
		
	/*被邀请活动页面的白云山详情点击事件*/	
	$('.show_detail').click(function(){
		$('#activeDetail').show();
		});
		
	//我的活动详情
	$('#eventDetail').click(function(e) {
        $('#activeDetail').show();
		$('.btnDiv').hide();
    });
	//关闭详情弹出框
	$('#detailClose').click(function(){
		
		$('#activeDetail').hide();
	});
	
	//关闭发起活动弹出框
	$('#standupClose').click(function(){
		$('.standup').hide();
		
		$('.invited').hide();
		$('.events').show();
		$('#start').removeClass('active1');
		$('#activities').addClass('active1');
		
	});
	//发起活动确定按钮
	$('#submintEvent').click(function(){
		$('.standup').hide();
		
		$('.invited').hide();
		$('.events').show();
		$('#start').removeClass('active1');
		$('#activities').addClass('active1');
		
	});
	
	$('#eventTable').dataTable({
			"bPaginate": true, //开关，是否显示分页器
		"bFilter" : false,// 去掉搜索框
		"bSort" : true,
	    "aaSorting" : [ [ 1, 'desc' ] ],
		"bAutoWidth" : false, // 自适应宽度
		"bLengthChange" : false,
		"sPaginationType" : "full_numbers",
		"bDestroy" : true,
		"bProcessing" : true,
		"oLanguage":{
			"sProcessing" : "正在加载中......",
			"sLengthMenu" : "每页显示_MENU_条记录",
			"sZeroRecords" : "没有数据！",
			"sEmptyTable" : "表中无数据存在！",
			"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
			"sInfoEmpty" : "显示0到0条记录",
			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
			// "sSearch" : "搜索",
			"oPaginate" : {
				"sFirst" : "首页",
				"sPrevious" : "上一页",
				"sNext" : "下一页",
				"sLast" : "末页"
			}
			},
		
		});
		
		
		
		$('#invitedTable').dataTable({
			"bPaginate": true, //开关，是否显示分页器
		"bFilter" : false,// 去掉搜索框
		"bSort" : true,
	    "aaSorting" : [ [ 1, 'desc' ] ],
		"bAutoWidth" : false, // 自适应宽度
		"bLengthChange" : false,
		"sPaginationType" : "full_numbers",
		"bDestroy" : true,
		"bProcessing" : true,
		"oLanguage":{
			"sProcessing" : "正在加载中......",
			"sLengthMenu" : "每页显示_MENU_条记录",
			"sZeroRecords" : "没有数据！",
			"sEmptyTable" : "表中无数据存在！",
			"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
			"sInfoEmpty" : "显示0到0条记录",
			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
			// "sSearch" : "搜索",
			"oPaginate" : {
				"sFirst" : "首页",
				"sPrevious" : "上一页",
				"sNext" : "下一页",
				"sLast" : "末页"
			}
			},
		
		});
	});
	

