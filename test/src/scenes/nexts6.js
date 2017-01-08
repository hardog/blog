(function(bm){

var nexts6 = bm.scenes.nexts6 = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(bg){
        this.bmp = this.toBitmap(bg);
        nexts6.superclass.constructor.call(this, {
            children: [this.bmp]
        });

        this.scaleX = .1;
        this.scaleY = .1;
        this.x = bm.stage.width - 100;
        this.y = bm.stage.height - 100;
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
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1
        }, {
            duration: 3000,
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
            duration: 4000,
            delay: 1500,
            ease: self.outEase,
            onStart: function(){
                bm.loadNext('s7');
            },
            onComplete: function(){
               bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);