(function(bm){

var nexts7 = bm.scenes.nexts7 = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(bg){
        this.bmp = this.toBitmap(bg);
        nexts7.superclass.constructor.call(this, {
            children: [this.bmp]
        });

        this.x = -200;
        this.y = this.bmp.height * 0.1;
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
            alpha: 1,
            y: 0,
            x: 0
        }, {
            duration: 3000,
            ease: self.enterEase,
            onComplete: function(){
                console.log('over');
                // self.hide();
            }
        });
    }
});

})(window.BM);