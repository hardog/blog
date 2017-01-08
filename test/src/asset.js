(function(bm){

var Asset = bm.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,

    load: function(){
        var self = this;
        var resources = [
            {id:'land', src:'images/land.jpg'},
            {id:'square', src:'images/square.png'},
            {id:'rose', src:'images/rose.png'},
            {id:'s0', src:'images/0.jpg'},
            {id:'s1', src:'images/1.jpg'},
            {id:'s2', src:'images/2.jpg'},
            {id:'s3', src:'images/3.jpg'},
            {id:'s4', src:'images/4.jpg'},
            {id:'s5', src:'images/5.jpg'},
            {id:'s6', src:'images/6.jpg'},
            {id:'s7', src:'images/7.jpg'},
            {id:'s8', src:'images/8.jpg'}
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