(function(){

window.onload = function(){
    stage.init();
};

var stage = window.stage = {
    width: window.screen.width,
    height: 600,
    scale: 1,
    background: '#ddd',

    stage: null,

    // instance class
    ticker: null,
    texter: null,

    useTicker: true,

    init: function(){
        var self = this;
        //init stage
        self.stage = new Hilo.Stage({
            renderType: 'canvas',
            container: document.body,
            width: self.width,
            height: self.height
        });

        //start stage ticker
        var ticker = new Hilo.Ticker(60);
        ticker.addTick(self.stage);
        ticker.start();

        //init texture atlas
        var atlas = new Hilo.TextureAtlas({
            image: 'images/fish.png',
            width: 174,
            height: 1512,
            frames: {
                frameWidth: 174,
                frameHeight: 126,
                numFrames: 12
            },
            sprites: {
                fish: {from:0, to:7}
            }
        });

        //create a fish sprite
        var fish = new Hilo.Sprite({
            frames: atlas.getSprite('fish'),
            x: 0,
            y: 100,
            interval: 6,
            timeBased: false,
            loop: true,
            onUpdate: function(){
                if(this.x > self.stage.width - this.pivotX){
                    this.x = 0;
                }else{
                    this.x += 3;
                }
            }
        }).addTo(self.stage);

        //use TextureAtlas.createSpriteFrames, create a fish sprite
        var fish = new Hilo.Sprite({
            frames: Hilo.TextureAtlas.createSpriteFrames("swim", "0-7", document.getElementById("fish"), 174, 126, true),
            x: 0,
            y: 200,
            alpha:0.5,
            interval: 6,
            timeBased: false,
            loop: true,
            onEnterFrame: function(frameIndex){
                if(this.x > self.stage.width - this.pivotX){
                    this.x = 0;
                }else{
                    this.x += 3;
                }
            }
        }).addTo(self.stage);
    }
};

})();
