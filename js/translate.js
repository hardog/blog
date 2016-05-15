function show(data){
	// clear before
	if(data.errorCode !== 0){return;}
	$('.show-text').html(data.translation.join(','));
	$('.show-text').css('visibility', 'visible');
	// 500ms clear showText
	setTimeout(function(){
		$('.show-text').css('visibility', 'hidden');
	}, 1000);
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
	$('.translate-btn').on('click', showSelect);
});
