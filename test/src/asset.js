(function(bm){

var Asset = bm.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    firstQueue: null,
    resStage1: [
        {id:'land', src:'images/land.jpg'},
        {id:'square', src:'images/square.png'},
        {id:'rose', src:'images/rose.png'}
    ],
    resStage2: [
        {id:'s1', src:'images/1.jpg'},
        {id:'s2', src:'images/2.jpg'}
    ],
    resStage3: [
        {id:'s3', src:'images/3.jpg'}
    ],
    resStage4: [
        {id:'s4', src:'images/4.jpg'}
    ],
    resStage5: [
        {id:'s5', src:'images/5.jpg'}
    ],
    resStage6: [
        {id:'s6', src:'images/6.jpg'}
    ],
    resStage7: [
        {id:'s7', src:'images/7.jpg'}
    ],

    load: function(){
        var self = this;

        self.firstQueue = new Hilo.LoadQueue(this.resStage1);
        self.firstQueue.maxConnections = 4;
        self.firstQueue.on('complete', function(){
            self.firstQueue.off('complete');
            self.fire('stage1');
            self.stage2();
        });
        self.firstQueue.start();
    },

    stage2: function(){
        var self = this;

        self.firstQueue.add(this.resStage2);
        self.firstQueue.on('complete', function(){
            self.firstQueue.off('complete');
            self.fire('stage2');
            self.stage3();
        });
        self.firstQueue.start();
    },

    stage3: function(){
        var self = this;

        self.firstQueue.add(this.resStage3);
        self.firstQueue.on('complete', function(){
            self.firstQueue.off('complete');
            self.fire('stage3');
            self.stage4();
        });
        self.firstQueue.start();
    },

    stage4: function(){
        var self = this;

        self.firstQueue.add(this.resStage4);
        self.firstQueue.on('complete', function(){
            self.firstQueue.off('complete');
            self.fire('stage4');
            self.stage5();
        });
        self.firstQueue.start();
    },

    stage5: function(){
        var self = this;

        self.firstQueue.add(this.resStage5);
        self.firstQueue.on('complete', function(){
            self.firstQueue.off('complete');
            self.fire('stage5');
            self.stage6();
        });
        self.firstQueue.start();
    },

    stage6: function(){
        var self = this;

        self.firstQueue.add(this.resStage6);
        self.firstQueue.on('complete', function(){
            self.firstQueue.off('complete');
            self.fire('stage6');
            self.stage7();
        });
        self.firstQueue.start();
    },

    stage7: function(){
        var self = this;

        self.firstQueue.add(this.resStage7);
        self.firstQueue.on('complete', function(){
            self.firstQueue.off('complete');
            self.fire('stage7');
        });
        self.firstQueue.start();
    },

    get: function(id){
        return this.firstQueue.get(id);
    },

    rate: function(){
        var loaded = this.firstQueue.getLoaded();
        var total = this.firstQueue.getTotal();

        if(!total){return '0%';}

        var rate = parseInt((loaded / total).toFixed(2) * 100);
        return rate + '%';
    }
});

})(window.BM);