(function(bm){

var Loading = bm.Loading = Hilo.Class.create({
    Extends: Hilo.Text,

    loadInterval: null,
    constructor: function(obj){
        Loading.superclass.constructor.call(this, obj);

        this.align = Hilo.align.CENTER;
        this.text = '0%';
        this.color = '#2b4716';
        this.font = '40px 微软雅黑';
        this.width = 40;
        this.height = 40;
    },

    start: function(){
        var self = this;
        this.loadInterval = setInterval(function(){
            self.text = bm.asset.rate();
        }, 5);
    },

    stop: function(){
        clearInterval(this.loadInterval);
    }
});

})(window.BM);