/* 龙飞玲  2014.8.18*/
$(function(){
	
	$('.details').hide();
	$('.addNote').hide();
	//打开详情
	$('[class *= showDetail]').click(function(){
		$('.details').show();
		$('.enable').attr('disabled',true);
	});
	
	//关闭详情弹出框
	$('.close').click(function(){
		
		$('.details').hide();
	});
	
	//打开添加字条窗口
	$('.addBtn').click(function(){
		$('.addNote').show();
	});
	
	//关闭添加弹出框
	$('.close1').click(function(){
		$('.addNote').hide();
	});
	
	$('#mytable').dataTable({
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
})
function updateNote(){
	$('.enable').attr('disabled',false);
	$('.btn_group').empty().append('<input type="button" value="保存" class="btn btn-info btn-sm";/>&nbsp;&nbsp;&nbsp;<input type="button" value="删除" class="btn btn-info btn-sm" />');
	};