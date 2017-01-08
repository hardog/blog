(function(bm){

var nexts1 = bm.scenes.nexts1 = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
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

    start: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: 1
        }, {
            duration: 1000,
            ease: self.enterEase,
            onComplete: function(){
                self.leftToRight();
            }
        });
    },

    leftToRight: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: 1,
            x: -self.width / 3
        }, {
            duration: 2000,
            ease: self.enterEase,
            onComplete: function(){
                self.rightToLeft();
            }
        });
    },

    rightToLeft: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: 0.8,
            x: 0
        }, {
            duration: 2000,
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
            duration: 1000,
            ease: self.outEase,
            onStart: function(){
                bm.loadNext('s2');
            },
            onComplete: function(){
                bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);