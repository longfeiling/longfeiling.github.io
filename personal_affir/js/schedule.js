$(document).ready(function() {
	// 时间设置
		jQuery('#startTime').datetimepicker({
			timeFormat: "HH:mm:ss",
			dateFormat: "yy-mm-dd"
		});
		 jQuery('#endTime').datetimepicker({
			timeFormat: "HH:mm:ss",
			dateFormat: "yy-mm-dd"
		});
		jQuery('#startUpdate').datetimepicker({
			timeFormat: "HH:mm:ss",
			dateFormat: "yy-mm-dd"
		});
		 jQuery('#endUpdate').datetimepicker({
			timeFormat: "HH:mm:ss",
			dateFormat: "yy-mm-dd"
		});
	
	/* initialize the external events
	-----------------------------------------------------------------*/

	$('#external-events div.external-event').each(function() {
	
		// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
		// it doesn't need to have a start or end
		var eventObject = {
			title: $.trim($(this).text()) // use the element's text as the event title
		};
		
		// store the Event Object in the DOM element so we can get to it later
		$(this).data('eventObject', eventObject);
		
		// make the event draggable using jQuery UI
		$(this).draggable({
			zIndex: 999,
			revert: true,      // will cause the event to go back to its
			revertDuration: 0  //  original position after the drag
		});
		
	});


	/* initialize the calendar
	-----------------------------------------------------------------*/
	
	$('#calendar').fullCalendar({		
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		buttonText:{
			
			prevYear: '去年',
			nextYear: '明年',
			today:    'now',
			month:    '月',
			week:     '周',
			day:      '日'
			},
			
			
		//allDayText:"今天的任务",
		eventLimit: true, // allow "more" link when too many events
		events: [
			{
				title: 'All Day Event',
				start: '2014-08-01'
			},
			{
				title: 'Long Event',
				start: '2014-08-07',
				end: '2014-08-10'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: '2014-08-09T16:00:00'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: '2014-08-16T16:00:00'
			},
			{
				title: 'Conference',
				start: '2014-08-11',
				end: '2014-08-13'
			},
			{
				title: 'Meeting',
				start: '2014-08-12T10:30:00',
				end: '2014-08-12T12:30:00'
			},
			{
				title: 'Lunch',
				start: '2014-08-12T12:00:00'
			},
			{
				title: 'Meeting',
				start: '2014-08-12T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: '2014-08-12T17:30:00'
			},
			{
				title: 'Dinner',
				start: '2014-08-12T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: '2014-08-13T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2014-08-28'
			}
		],
		selectable:true,
		selectHelper:true,
		select: function(start, end) {
			//var title = prompt('Event Title:');
			var title = $('#addTip').show();
			$(':input','#addTip')
							.not(':button,:submit,:reset,:hidden')   //将myform表单中input元素type为button、submit、reset、hidden排除
							.val('');  //将input元素的value设为空值	
			/*var eventData;
			if (title) {
				eventData = {
					title: title,
					start: start,
					end: end
				};
				$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			}
			$('#calendar').fullCalendar('unselect');*/
		},			
		eventClick: function(calEvent, jsEvent, view) {
			$('#updateTip').show();
			$('#titleUpdate').attr('value',calEvent.title);
			$('#startUpdate').attr('value',calEvent.start);
			$('#endtUpdate').attr('value',calEvent.end);
			 },
		
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar !!!
		drop: function(date) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
			
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
		
		}
		
	});
	
	//2014.08.25添加   陈泽芳
	$('#addTip').hide();
	$('#updateTip').hide();
	$('#detailClose').click(function(e) {
		$('#addTip').hide();
	});
	$('#closeUpdate').click(function(e) {
		$('#updateTip').hide();
	});
	
	//切换是否显示结束时间
	$("#selectTime").bind("click",function(){
		if($("#selectTime").attr("checked")== "checked"){
		  $('#end').attr({style:"display:none"});
		  $("#selectTime").attr("checked",false);
		}else{
			$('#end').attr({style:"display:block"});
			$("#selectTime").attr("checked",true);
		}
		}); 
	
	$("#selectTimeUpdate").bind("click",function(){
		if($("#selectTimeUpdate").attr("checked")== "checked"){
		  $('#endUpdate').attr({style:"display:none"});
		  $("#selectTimeUpdate").attr("checked",false);
		}else{
			$('#endUpdate').attr({style:"display:block"});
			$("#selectTimeUpdate").attr("checked",true);
		}
		}); 

});
