$(function(){
	$('.report-model').show();
	$('.leaveManage').hide();
	$('.download_model').hide();
	$('.add-report-div').hide();
	$('.usingModel').hide();
	//小标题切换
	$('a[class*=submenu]').click(function(e) {
		
        $(this).siblings('a').removeClass('active1');
		$(this).addClass('active1');
		
    });
	
	
	/*报告管理链接的点击事件*/
	$('#report').click(function(){
		$('.leaveManage').hide();
		$('.download_model').hide();
		$('.add-report-div').hide();
		
		$('.report-model').show();
		
		});

	/*	请假管理链接的点击事件*/	
	$("#leave").click(function(e) {
        $('.report-model').hide();
		$('.add-report-div').hide();
		$('.download_model').hide();
		$('.leaveManage').show();
    });
		
	/*下载模板链接的点击事件*/
	$('#download').click(function(){
		$('.report-model').hide();
		$('.add-report-div').hide();
		$('.leaveManage').hide();
		
		$('.download_model').show();
		});
		
	/*添加报告按钮的点击事件*/	
	$('#add-report').click(function(){
		
		$('.add-report-div').show();
		});
	
	/*点击使用模板弹出内容*/
	$('#usingModel').click(function(e) {
		$('.add-report-div').hide();
        $('.usingModel').show();
    });
	
	/*添加报告弹框的下载模板的点击事件*/	
	$('#downloadModel').click(function(){
		$('a[class*=submenu').removeClass('active1');
		$('#download').addClass('active1');
		$('.add-report-div').hide();
		$('.report-model').hide();
		$('.leaveManage').hide();
		$('.download_model').show();
		});
	//添加报告弹出框 的关闭按钮	
	$('#reportClose').click(function(){
		$('.add-report-div').hide();
		});
	
	//使用模板弹出框 的关闭按钮	
	$('#modelClose').click(function(){
		$('.usingModel').hide();
		});
		
	$('#reportList').dataTable({
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
		
		
		//已有模板的dataTable	
		$('#modelList').dataTable({
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