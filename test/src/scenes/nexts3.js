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

        this.x = 100;
        this.alpha = 0;
        this.depth = 2;
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
        this.text = new bm.Text('2016| 我见到天底下最可爱的表情', 'ltr', 12);
        this.text2 = new bm.Text('2016| 也见到天底下最蠢的/[加班狗]', 'rtl', 12);
        bm.stage.addChild(this.text);
        bm.stage.addChild(this.text2);
        this.text.ready(5000);
        this.text2.ready(5000);
    },

    start: function(){
        var self = this;

        bm.tween.to(self, {
            x: -(self.width - bm.stage.width),
            alpha: 1,
        }, {
            duration: 7000,
            ease: self.enterEase,
            onStart: function(){
                bm.particle();
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
            x: -self.width,
            alpha: 0
        }, {
            duration: 5000,
            delay: 1500,
            ease: self.outEase,
            onStart: function(){
                bm.stage.removeChild(self.text);
                bm.stage.removeChild(self.text2);
                bm.loadNext('s4');
            },
            onComplete: function(){
               bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);