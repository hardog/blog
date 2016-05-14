;(function($){
	function translateTozhCN(eng){
		var url = 'http://fanyi.youdao.com/openapi.do? \
			  keyfrom=startexample \
			  &key=1172896456 \
			  &type=data \
			  &doctype=json \
			  &version=1.1 \
			  &q=' + eng;

		$.get(url, function(data, status, xhr){
			console.log('data', data);
		});
	}

	function showSelect(){
		var selecter = window.getSelection();

        if(selecter != null && $.trim(selecter) != ''){
        	translateTozhCN(selecter);
    	}
	}

	document.onmouseup = showSelect;
})(Zepto)