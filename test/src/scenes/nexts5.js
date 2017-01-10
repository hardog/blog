(function(bm){

var nexts5 = bm.scenes.nexts5 = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(bg){
        this.left = this.toBitmap(bg);
        this.right = this.toBitmap(bg);

        nexts5.superclass.constructor.call(this, {
            children: [this.left, this.right]
        });

        this.height = bm.stage.height;
        this.x = -this.left.width/2;
        this.background = '#000';

        this.left.x = 120;
        this.left.alpha = .7;

        this.right.x = bm.stage.width + this.left.width/2;
        this.right.alpha = 0;

        this.isFinished = 0;
        this.isHided = 0;
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
        this.text = new bm.Text('2016| 我们玩过, 二过, 闹过也笑过', 'taping', 12, {
            txtIntr: 400,
            background: 'transparent',
            txtColor: '#fff'
        });
        bm.stage.addChild(this.text);
        this.text.ready();
    },

    start: function(){
        var self = this;

        bm.tween.to(self.left, {
            x: this.left.width/2,
            alpha: 1
        }, {
            duration: 7000,
            ease: self.enterEase,
            onStart: function(){
                if(!self.textShowed){
                    self.showText();
                    self.textShowed = true;
                }
            },
            onComplete: function(){
                self.hide();
            }
        });

        bm.tween.to(self.right, {
            x: this.left.width/2,
            alpha: .2
        }, {
            duration: 7000,
            ease: self.enterEase,
            onStart: function(){
                if(!self.textShowed){
                    self.showText();
                    self.textShowed = true;
                }
            },
            onComplete: function(){
                self.hide();
            }
        });
    },

    hide: function(){
        var self = this;

        if(!self.finished()){return;}

        bm.tween.to(self.left, {
            alpha: 0
        }, {
            duration: 5000,
            delay: 2500,
            ease: self.outEase,
            onStart: function(){
                if(!self.hided()){return;}
                bm.stage.removeChild(self.text);
                bm.loadNext('s6');
            },
            onComplete: function(){
               bm.stage.removeChild(self.left);
            }
        });

        bm.tween.to(self.right, {
            alpha: 0
        }, {
            duration: 5000,
            delay: 2500,
            ease: self.outEase,
            onStart: function(){
                if(!self.hided()){return;}
                bm.stage.removeChild(self.text);
                bm.loadNext('s6');
            },
            onComplete: function(){
               bm.stage.removeChild(self.right);
            }
        });
    },

    finished: function(){
        this.isFinished += 1;
        if(this.isFinished !== 2){
            return false;
        }

        return true;
    },

    hided: function(){
        this.isHided += 1;
        if(this.isHided !== 2){
            return false;
        }

        return true;
    }
});

})(window.BM);