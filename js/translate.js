function show(data){
	// clear before
	if(data.errorCode !== 0){return;}
	$('.showText').html(data.translation.join(','));
	$('.showText').css('display', 'block');
	// 500ms clear showText
	setTimeout(function(){
		$('.showText').css('display', 'none');
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
	$('.tozhCN').on('click', showSelect);
});
