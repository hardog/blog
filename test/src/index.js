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
        self.asset.on('complete', function(){
            self.playMusic();
            loading.stop();
            self.stage.removeChild(loading);
            self.startFlow();
        });

        self.stage.addChild(loading);
        loading.start();
        self.asset.load();
    },

    startFlow: function(){
        // this.pre = new BM.scenes.nexts5(this.asset.get('s5'));
        // this.stage.addChild(this.pre);
        // this.pre.start();
        this.pre = new BM.scenes.Land(this.asset.get('land'));
        this.stage.addChild(this.pre);
        this.pre.start();
    },

    loadNext: function(nextId){
        var self = this;
        self['next' + nextId] = new BM.scenes['next' + nextId](self.asset.get(nextId));
        self.stage.addChild(self['next' + nextId]);
        self['next' + nextId].start();
    },

    playMusic: function(){
        var audio = Hilo.WebSound.getAudio({
            src: './music/zzydjd.mp3',
            loop: false
        }).play();
        // var music = document.getElementById('bmMusic');
        // music.play();
    }
};

})();
