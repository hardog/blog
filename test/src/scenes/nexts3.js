(function(bm){

var nexts3 = bm.scenes.nexts3 = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(bg){
        this.bmp = this.toBitmap(bg);
        nexts3.superclass.constructor.call(this, {
            children: [this.bmp]
        });

        this.x = bm.stage.width;
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
            x: -(self.width - bm.stage.width)
        }, {
            duration: 7000,
            ease: self.enterEase,
            onComplete: function(){
                self.hide();
            }
        });
    },

    hide: function(){
        var self = this;

        bm.tween.to(self, {
            x: -self.width,
            alpha: 0
        }, {
            duration: 5000,
            delay: 1500,
            ease: self.outEase,
            onStart: function(){
                bm.loadNext('s4');
            },
            onComplete: function(){
               bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);