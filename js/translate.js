// global var
var curPosEvent;

function show(data){
	// clear before
	$('.showText').remove();
	if(data.errorCode !== 0){return;}
	var width  = curPosEvent.clientX;
	var height = curPosEvent.clientY - 40;

	var style = 'left:' + width + 'px;top:' + height + 'px';
	$('body').append('<div class="showText" style="' + style + '">' 
					 + data.translation.join(',')
					 + '</div>');

	// 500ms clear showText
	setTimeout(function(){
		$('.showText').remove();
	}, 1000);
	// alert(data.translation.join(','));
}

function translateTozhCN(eng){
	var param = $.param({
		keyfrom: 'startexample',
		key: '1172896456',
		type: 'data',
		doctype: 'jsonp',
		version: '1.1',
		callback: 'show',
		only: 'translate',
		q: eng
	});

	var url = 'http://fanyi.youdao.com/openapi.do?' + param;
	$('body').append('<script src=' + url + '></script>')
}

function showSelect(){
	var sel = window.getSelection();
	var selstr = (sel || '').toString();

    if($.trim(selstr) != ''){
    	translateTozhCN(selstr);
	}
}

$(function(){
	$(document).on('mouseup', function(e){
		curPosEvent = e;
		showSelect();
	});

	var agent = navigator.userAgent;

	alert(agent);
	alert(agent.match(/(iPhone|iPod|Android|ios)/i))

	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
		console.log('is mobile from touch');
		alert('is mobile from touch');
		$(document).on('touchend', function(e){
			curPosEvent = e;
			alert(e);
			showSelect();
		});
	}
});
