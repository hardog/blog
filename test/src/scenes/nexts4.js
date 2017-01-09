(function(bm){

var nexts4 = bm.scenes.nexts4 = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(bg){
        this.bmp = this.toBitmap(bg);
        nexts4.superclass.constructor.call(this, {
            children: [this.bmp]
        });

        this.x = bm.stage.width;
        this.alpha = 0.2;
        this.width = this.bmp.width;
        this.height = this.bmp.height;
    },

    toBitmap: function(img){
        var content = img.content;
        return new Hilo.Bitmap({
            id: img.id,
            image: content,
            width: content.width,
            height: content.height,
            rect: [0, 0, content.width, content.height]
        });
    },

    showText: function(){
        this.text = new bm.Text('2016| 我的宝贝是最漂亮的新娘', 'rtl', 12);
        bm.stage.addChild(this.text);
        this.text.ready(7000);
    },

    start: function(){
        var self = this;

        bm.tween.to(self, {
            x: -150,
            alpha: 1
        }, {
            duration: 6000,
            ease: self.enterEase,
            onStart: function(){
                self.showText();
            },
            onComplete: function(){
                self.hide();
            }
        });
    },

    hide: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: 0
        }, {
            duration: 1000,
            delay: 1500,
            ease: self.outEase,
            onStart: function(){
                bm.stage.removeChild(self.text);
                bm.loadNext('s5');
            },
            onComplete: function(){
               bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);