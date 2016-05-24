var selectedText, cacheTimeoutHandler, isSentence;
function show(data){
	// clear before
	if(data.errorCode !== 0){return;}
	var showText;

	if(isSentence){
		showText = data.translation.join(',');
	}else{
		showText = data.basic.explains.join(',');
	}

	$('.show-text').html(showText);
	$('.show-text').css('visibility', 'visible');
	// reset
	isSentence = false;
	// 500ms clear showText
	clearTimeout(cacheTimeoutHandler);
	cacheTimeoutHandler = setTimeout(function(){
		$('.show-text').css('visibility', 'hidden');
	}, 2000);
}

function translateTozhCN(){
	var param = $.param({
		keyfrom: 'startexample',
		key: '1172896456',
		type: 'data',
		doctype: 'jsonp',
		version: '1.1',
		callback: 'show',
		q: selectedText
	});

	// if include space is a sentence
	if(selectedText.indexOf(' ') !== -1){
		isSentence = true;
	}

	var url = 'http://fanyi.youdao.com/openapi.do?' + param;
	$('body').append('<script src=' + url + '></script>')
}

function cacheSelectedText(){
	var sel = window.getSelection();
	selectedText = $.trim((sel || '').toString());
}

$(function(){
	$('.translate-btn').on('click', translateTozhCN);

	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
		$(document).on('touchend', cacheSelectedText);
	}else{
		$(document).on('mouseup', cacheSelectedText);
	}

});
