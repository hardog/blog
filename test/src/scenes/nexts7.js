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

    createSquare: function(){
        var self = this;
        self.square = self.toBitmap(bm.asset.get('square'));
        self.square.scaleX = .8;
        self.square.scaleY = .8;
        self.square.alpha = .1;
        self.square.x = (bm.stage.width - self.square.width*0.8) / 2;
        self.square.y = (bm.stage.height - self.square.height) / 2;

        bm.stage.addChild(self.square);
        bm.tween.to(self.square, {
            alpha: .9
        }, {
            duration: 2000,
            ease: self.enterEase,
            onComplete: function(){
                setTimeout(function(){
                    self.updateText();
                }, 500);
            }
        });
    },

    updateText: function(){
        var self = this;
        var index = 0;

        self.txt = '亲爱的, 虽然2016我们经常争吵, 但仍未放弃彼此. 缘分就是这么奇妙, 上天眷顾了我让我拥有了你! 2017, 就让老公好好守护你, 爱你, 疼你. 虽不富有但还能靠着双手给你一个家, 一份温暖!';
        self.intrHandle = setInterval(function(){
            if(self.txt.length === index){
                clearInterval(self.intrHandle);
                return;
            }

            self.text && bm.stage.removeChild(self.text);
            self.text = self.createText(self.txt.slice(0, ++index));
            bm.stage.addChild(self.text);
        }, 200);
    },

    createText: function(txt){
        var self = this;
        return new Hilo.Text({
            maxWidth: self.square.width*0.8 - 50,
            text: txt,
            outline: false,
            color: '#779046',
            lineSpacing: 5,
            textAlign: 'left',
            font: '25px 楷体',
            x: self.square.x + 25,
            y: self.square.y + 20
        });
    },

    start: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: 1
        }, {
            duration: 5000,
            delay: 1500,
            ease: self.enterEase,
            // onStart: function(){
            //     bm.particle();
            // },
            onComplete: function(){
                self.createSquare();
            }
        });
    }
});

})(window.BM);