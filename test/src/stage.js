(function(){

window.onload = function(){
    stage.init();
};

var stage = window.stage = {
    width: window.screen.width,
    height: 400,
    scale: 1,
    background: '#ddd',

    stage: null,

    // instance class
    ticker: null,
    texter: null,

    useTicker: true,

    init: function(){
        //舞台
        this.stage = new Hilo.Stage({
            renderType:'canvas',
            container: document.body,
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale,
            background: this.background
        });

        this.loadTest();
        this.isUseTicker();
    },

    isUseTicker: function(){
        if(this.useTicker){
            this.ticker = new Hilo.Ticker(20);
            this.ticker.addTick(this.stage);
            this.ticker.start();
        }else{
            this.stage.tick(20);
        }
    },

    // test feature list
    loadTest: function(){
        this.testTexter();
    },

    testTexter: function(){
        var txt = new Hilo.Text({
            color: '#f00',
            text: 'Halo, this is Hilo test!',
            font: '20px 黑体',
            width: this.width,
            height: this.height,
            // background: '#ff0',
            maxWidth: this.width,
            textAlign: 'center',
            textVAlign: 'middle'
        }).addTo(this.stage);
    }
};

})();
