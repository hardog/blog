(function(bm){

bm.utils = {
    getWidth: function(){
        return window.innerWidth
            || document.documentElement.clientWidth 
            || document.body.clientWidth;
    },

    getHeight: function(){
        return window.innerHeight 
        || document.documentElement.clientHeight 
        || document.body.clientHeight;
    }
};

})(window.BM);