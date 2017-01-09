(function(){

window.onload = function(){
    BM.init();
};

var BM = window.BM = {
    // instance class
    ticker: null,
    stage: null,
    tween: Hilo.Tween,

    asset: null,
    scenes: {},

    // scenes
    land: null,
    s1Ready: false,
    s1NeedRunned: false,
    s3Ready: false,
    s3NeedRunned: false,
    s4Ready: false,
    s4NeedRunned: false,
    s5Ready: false,
    s5NeedRunned: false,
    s6Ready: false,
    s6NeedRunned: false,
    s7Ready: false,
    s7NeedRunned: false,

    init: function(){
        var self = this;

        self.stage = new Hilo.Stage({
            renderType:'canvas',
            container: document.body,
            width: BM.utils.getWidth(),
            height: BM.utils.getHeight(),
            background: '#e3ece9'
        });

        self.ticker = new Hilo.Ticker(20);
        self.ticker.addTick(self.stage);
        self.ticker.addTick(self.tween)
        self.ticker.start();

        self.asset = new BM.Asset();
        var loading = new BM.Loading();
        self.asset.on('stage1', function(){
            loading.stop();
            self.stage.removeChild(loading);
            self.startFlow();
        });

        self.asset.on('stage2', function(){
            self.s1Ready = true;
            if(self.s1NeedRunned){
                self.loadNext(this.curStageId);
            }
        });

        self.asset.on('stage3', function(){
            self.s3Ready = true;
            if(self.s3NeedRunned){
                self.loadNext(this.curStageId);
            }
        });

        self.asset.on('stage4', function(){
            self.s4Ready = true;
            if(self.s4NeedRunned){
                self.loadNext(this.curStageId);
            }
        });

        self.asset.on('stage5', function(){
            self.s5Ready = true;
            if(self.s5NeedRunned){
                self.loadNext(this.curStageId);
            }
        });

        self.asset.on('stage6', function(){
            self.s6Ready = true;
            if(self.s6NeedRunned){
                self.loadNext(this.curStageId);
            }
        });

        self.asset.on('stage7', function(){
            self.s7Ready = true;
            if(self.s7NeedRunned){
                self.loadNext(this.curStageId);
            }
        });

        self.stage.addChild(loading);
        loading.start();
        self.asset.load();
    },

    startFlow: function(){
        // this.pre = new BM.scenes.nexts6(this.asset.get('s6'));
        // this.stage.addChild(this.pre);
        // this.pre.start();
        this.pre = new BM.scenes.Land(this.asset.get('land'));
        this.stage.addChild(this.pre);
        this.pre.start();
    },

    loadNext: function(nextId){
        var self = this;

        if(nextId === 's1' && !self.s1Ready){
            self.curStageId = nextId;
            self.s1NeedRunned = true;
            return;
        }

        if(nextId === 's3' && !self.s3Ready){
            self.curStageId = nextId;
            self.s3NeedRunned = true;
            return;
        }

        if(nextId === 's4' && !self.s4Ready){
            self.curStageId = nextId;
            self.s4NeedRunned = true;
            return;
        }

        if(nextId === 's5' && !self.s5Ready){
            self.curStageId = nextId;
            self.s5NeedRunned = true;
            return;
        }

        if(nextId === 's6' && !self.s6Ready){
            self.curStageId = nextId;
            self.s6NeedRunned = true;
            return;
        }

        if(nextId === 's7' && !self.s7Ready){
            self.curStageId = nextId;
            self.s7NeedRunned = true;
            return;
        }
        
        if(!nextId){
            nextId = self.curStageId;
        }

        self['next' + nextId] = new BM.scenes['next' + nextId](self.asset.get(nextId));
        self.stage.addChild(self['next' + nextId]);
        self['next' + nextId].start();
    }
};

})();
