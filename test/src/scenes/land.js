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
        this.x = -100;
        // this.y = -200;
        this.scaleX = 1.4;
        this.scaleY = 1.4;
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
            scaleX: 1,
            scaleY: 1,
            alpha: 0.8
        }, {
            duration: 3000,
            ease: self.enterEase,
            onStart: function(){
                bm.particle();
            },
            onComplete: function(){
                self.createSquare();
            }
        });
    },

    createSquare: function(){
        var self = this;
        self.square = self.toBitmap(bm.asset.get('square'));
        self.square.scaleX = .8;
        self.square.scaleY = .8;
        self.alpha = .8;
        self.square.x = (bm.stage.width - self.square.width*0.8) / 2;
        self.square.y = bm.stage.height;

        bm.stage.addChild(self.square);
        bm.tween.to(self.square, {
            y: (bm.stage.height - self.square.height) / 2
        }, {
            duration: 1000,
            ease: self.enterEase,
            onComplete: function(){
                self.createLRWords();
                self.lrTween();
                self.showFlowers();
            }
        });
    },

    createLRWords: function(){
        var self = this;
        self.left = new Hilo.Text({
            text: 'Marry Me!',
            font: '30px 微软雅黑',
            color: '#779046',
            maxWidth: self.square.width,
            x: -(bm.stage.width - self.square.width) / 2,
            y: self.square.y + 40
        }).addTo(bm.stage);

        self.right = new Hilo.Text({
            text: 'My Girl, DONG!',
            font: '30px 微软雅黑',
            color: '#779046',
            maxWidth: self.square.width,
            x: bm.stage.width,
            y: self.square.y + 120
        }).addTo(bm.stage);
    },

    lrTween: function(){
        var self = this;

        bm.tween.to(self.left, {
            x: (bm.stage.width - 120) / 2
        }, {
            duration: 1000,
            delay: 5,
            ease: self.enterEase
        });

        bm.tween.to(self.right, {
            x: (bm.stage.width - 200) / 2
        }, {
            duration: 1000,
            delay: 5,
            ease: self.enterEase
        });
    },

    showFlowers: function(){
        var self = this;

        self.flower = self.toBitmap(bm.asset.get('rose'));
        self.flower.x = (bm.stage.width - 50) / 2;
        self.flower.y = self.left.y + 35;
        self.flower.scaleX = .8;
        self.flower.scaleY = .8;
        self.flower.alpha = 0;

        bm.stage.addChild(self.flower);
        bm.tween.to(self.flower, {
            alpha: 1
        }, {
            duration: 1550,
            ease: self.enterEase,
            onComplete: function(){
                self.showILoveU();
            }
        });
    },

    showILoveU: function(){
        var self = this;

        self.iloveu = new Hilo.Text({
            text: 'I  ❤️  U',
            font: '30px 微软雅黑',
            color: '#e23946',
            alpha: 0,
            x: (bm.stage.width - 50) / 2,
            y: self.square.y + 200
        }).addTo(bm.stage);

        bm.tween.to(self.iloveu, {
            x: self.iloveu.x - 50,
            alpha: 1,
            scaleX: 1.8,
            scaleY: 1.8
        }, {
            duration: 1500,
            delay: 10,
            ease: self.outEase,
            onComplete: function(){
                setTimeout(function(){
                    self.hide();
                    bm.loadNext('s1');
                }, 1000);
            }
        });
    },

    hide: function(){
        var self = this;
        bm.tween.to(self.square, {alpha: 0}, {
            duration: 1500,
            onComplete: function(){
                bm.stage.removeChild(self.square);
            }
        });
        bm.tween.to(this.left, {alpha: 0}, {
            duration: 1500,
            onComplete: function(){
                bm.stage.removeChild(self.left);
            }
        });
        bm.tween.to(this.flower, {alpha: 0}, {
            duration: 1500,
            onComplete: function(){
                bm.stage.removeChild(self.flower);
            }
        });
        bm.tween.to(this.right, {alpha: 0}, {
            duration: 1500,
            onComplete: function(){
                bm.stage.removeChild(self.right);
            }
        });
        bm.tween.to(this.iloveu, {alpha: 0}, {
            duration: 1500,
            onComplete: function(){
                bm.stage.removeChild(self.iloveu);
            }
        });
        bm.tween.to(this, {alpha: 0}, {
            duration: 1500,
            onComplete: function(){
                bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);