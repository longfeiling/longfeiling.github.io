/*
*零碎的javascript公用方法
*2015.9.14
*/

//阻止冒泡
function stopBubble(e) {
	if(e && e.stopPropagation) {   //如果传入了事实对象，则证明不是IE浏览器
		e.stopPropagation();
	}else {
		window.event.cancelBubble = true; //使用IE的方式来取消时间冒泡
	}
}

// 
function stopDefault(e) {
	if(e && e.preventDefault) {
		e.preventDefault();   //防止默认浏览器行为（W3C）
	}else {
		window.event.returnValue = false;
	}
}

function addEvent(element,type,hander) {
	if(!hander.$$guid) {  //为每一个事件处理函数赋予一个独立的ID
		hander.$$guid = addEvent.guid++;
	}
	if(!element.events) {  //为元素建立一个事件类型的散列表
		element.events = {};
	}

	var handers = element.events[type] = {};

	if(!hander) {
		ha
	}
}