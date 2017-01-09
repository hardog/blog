(function(bm){

var nexts1 = bm.scenes.nexts1 = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,

    text: null,
    constructor: function(bg){
        this.bmp = this.toBitmap(bg);
        nexts1.superclass.constructor.call(this, {
            children: [this.bmp]
        });

        this.alpha = 0;
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
        this.text = new bm.Text('2016| 那令我一眼着迷的地方', 'ltr', 12);
        bm.stage.addChild(this.text);
        this.text.ready(9000);
    },

    start: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: .8
        }, {
            duration: 1500,
            ease: self.enterEase,
            onStart: function(){
                self.showText();
            },
            onComplete: function(){
                self.leftToRight();
            }
        });
    },

    leftToRight: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: .8,
            x: -self.width / 3
        }, {
            duration: 5000,
            ease: self.enterEase,
            onComplete: function(){
                self.rightToLeft();
            }
        });
    },

    rightToLeft: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: .6,
            x: 0
        }, {
            duration: 5000,
            ease: self.enterEase,
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
            duration: 3000,
            ease: self.outEase,
            onStart: function(){
                bm.loadNext('s2');
            },
            onComplete: function(){
                bm.stage.removeChild(self.text);
                bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);