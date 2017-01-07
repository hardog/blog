(function(bm){

var Land = bm.scenes.Land = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(bg){
        this.bmp = this.toBitmap(bg);
        Land.superclass.constructor.call(this, {
            children: [this.bmp]
        });

        this.alpha = 0;
        this.width = this.bmp.width;
        this.height = this.bmp.height;
        this.x = -550;
        this.y = -100;
        this.scaleX = 1.5;
        this.scaleY = 1.5;
    },

    toBitmap: function(img){
        let content = img.content;
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
            scaleX: 1,
            scaleY: 1,
            alpha: 0.8
        }, {
            duration: 3000,
            ease: self.enterEase,
            onComplete: function(){
                bm.loaded('land');
            }
        });
    }
});

})(window.BM);