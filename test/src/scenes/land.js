(function(bm){

var Land = bm.scenes.Land = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(bg){
        Land.superclass.constructor.call(this, {
            children: [this.toBitmap(bg)]
        });

        this.alpha = 0;
        this.width = bm.stage.width;
        this.height = bm.stage.height;
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
            alpha: 1
        }, {
            duration: 1500,
            ease: self.enterEase,
            onComplete: function(){
                self.hideNow();
            }
        });
    },

    // 淡出方式, right => left
    hideNow: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: 0.1,
        }, {
            duration: 1000,
            ease: self.outEase,
            onComplete: function(){
                bm.loaded('land');
            }
        });
    }
});

})(window.BM);