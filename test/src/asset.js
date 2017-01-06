(function(bm){

var Asset = bm.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    queue: null,

    load: function(){
        var self = this;
        var resources = [
            {id:'land', src:'images/land.jpg'},
            {id:'land', src:'images/snowflake.png'},

            {id:'land', src:'images/1.jpg'},
            {id:'land', src:'images/2.jpg'},
            {id:'land', src:'images/3.jpg'},
            {id:'land', src:'images/4.jpg'},
            {id:'land', src:'images/5.png'}
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