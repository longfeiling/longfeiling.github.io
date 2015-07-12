/*****控制脚本********/
$(function(){
	$(".level1 > .selected").addClass("current")   //给当前元素添加"current"样式
	.next().show() ;
	$(".level1 > a").click(function(){
		$(this).addClass("current")   //给当前元素添加"current"样式
		.next().show()                //下一个元素显示
		.parent().siblings().children("a").removeClass("current")        //父元素的兄弟元素的子元素<a>移除"current"样式
		.next().hide();                //它们的下一个元素隐藏
		return false;
	});
	
	
	//调用Nivoslider插件
	$("#slider").nivoSlider();
});
	
	
$(function(){
	var btn = "";
	btn += "<div class='preNext pre'></div><div class='preNext next'></div>";
	$(".v_content").append(btn);
	
	$(".preNext").css("opacity",0.2).hover(function() {
		$(this).stop(true,false).animate({"opacity":"0.5"},300);
	},function() {
		$(this).stop(true,false).animate({"opacity":"0.2"},300);
	});
	
	
	var page = 1;
	var i = 4; //每版放4个图片
	//向后 按钮
	$(".next").click(function(){    //绑定click事件
		 var $parent = $(this).parents(".v_show");//根据当前点击元素获取到父元素
		 var $v_show = $parent.find("div.v_content_list"); //寻找到“视频内容展示区域”
		 var $v_content = $parent.find(".v_content"); //寻找到“视频内容展示区域”外围的DIV元素
		 var v_width = $v_content.width() ;
		 var len = $v_show.find("li").length;
		 var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
		 if( !$v_show.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
			  if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
				$v_show.animate({ left : '0px'}, "slow"); //通过改变left值，跳转到第一个版面
				page = 1;
			  }else{
				$v_show.animate({ left : '-='+v_width }, "slow");  //通过改变left值，达到每次换一个版面
				page++;
			 }
		 }
   });
	//往前 按钮
	$(".pre").click(function(){
		 var $parent = $(this).parents(".v_content");//根据当前点击元素获取到父元素
		 var $v_show = $parent.find(".v_content_list"); //寻找到“视频内容展示区域”
		 var $v_content = $parent.find(".v_content"); //寻找到“视频内容展示区域”外围的DIV元素
		 var v_width = $v_content.width();
		 var len = $v_show.find("li").length;
		 var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
		 if( !$v_show.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
			 if( page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
				$v_show.animate({ left : '-='+v_width*(page_count-1) }, "slow");
				page = page_count;
			}else{
				$v_show.animate({ left : '+='+v_width }, "slow");
				page--;
			}
		}
	});
	
});