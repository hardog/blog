(function(bm){

var Asset = bm.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,

    load: function(){
        var self = this;
        var resources = [
            {id:'land', src:'images/land.jpg'},
            {id:'0', src:'images/0.jpg'},
            {id:'1', src:'images/1.jpg'},
            {id:'2', src:'images/2.jpg'},
            {id:'3', src:'images/3.jpg'},
            {id:'4', src:'images/4.jpg'},
            {id:'5', src:'images/5.jpg'},
            {id:'6', src:'images/6.jpg'},
            {id:'7', src:'images/7.jpg'},
            {id:'8', src:'images/8.jpg'},
            {id:'9', src:'images/9.jpg'}
        ];

        self.queue = new Hilo.LoadQueue();
        self.queue.add(resources);
        self.queue.on('complete', function(){
            self.queue.off('complete');
            self.fire('complete');
        });
        self.queue.start();
    },

    get: function(id){
        return this.queue.get(id);
    },

    rate: function(){
        var loaded = this.queue.getLoaded();
        var total = this.queue.getTotal();

        if(!total){return '0%';}

        let rate = parseInt((loaded / total).toFixed(2) * 100);
        return rate + '%';
    }
});

})(window.BM);