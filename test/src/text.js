(function(bm){

var Text = bm.Text = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,

    text: null,
    txt: null,

    // container config
    background: '#fff', //#fdfbf8

    // text config
    txtIntr: 300,
    txtUseIntr: false,
    txtIntrHandle: null,
    txtNumPerLine: 10,
    txtFontSize: 25,
    txtLineSpacing: 3,
    txtColor: '#779046',//'#779046',
    txtAlign: 'left',
    txtFontStyle: '楷体',
    txtX: 10,
    txtY: 10,

    constructor: function(text, type, perline, ext){
        Text.superclass.constructor.call(this, {});

        ext = ext || {};
        this.background = ext.background || this.background;
        this.txtColor = ext.txtColor || this.txtColor;
        this.txtFontSize = ext.txtFontSize || this.txtFontSize;
        this.txtIntr = ext.txtIntr || this.txtIntr;

        // get scale relative to square image
        this.txtNumPerLine = perline || this.txtNumPerLine;
        var wh = this.calContainerWH(text);
        this.width = wh.w;
        this.height = wh.h;
        this.txt = text;
        this.depth = 10;
        this.background = this.background;
        this.parseType(type);
    },

    // type: default, taping, ltr(left to right), rtl(right to left)
    parseType: function(type){
        this.type = type || 'default';

        this.txtUseIntr = false;
        switch(this.type){
        case 'taping':
            this.txtUseIntr = true;
            this.x = 40;
            this.y = 60;
            break;
        case 'ltr':
            this.x = -this.width;
            this.y = 60;
            this.alpha = 0;
            break;
        case 'rtl':
            this.x = bm.stage.width;
            this.y = bm.stage.height - this.height - 60;
            this.alpha = 0;
            break;
        case 'trtl':
            this.x = bm.stage.width;
            this.y = 60;
            this.alpha = 0;
            break;
        case 'last':
            this.x = (bm.stage.width - this.width) / 2;
            this.y = (bm.stage.height - this.height) / 2;
            this.alpha = 0;
            break;
        default:
            this.x = 40;
            this.y = 60;
            this.alpha = 0;
            break;
        }
    },

    calContainerWH: function(txt){
        var self = this;

        if(self.txtNumPerLine > txt.length){
            self.txtNumPerLine = txt.length;
        }

        var row = Math.ceil(txt.length / self.txtNumPerLine);
        return {
            w: self.txtNumPerLine * self.txtFontSize + 2 * self.txtX,
            h: row * self.txtFontSize + 3 * self.txtY + self.txtLineSpacing * (row - 1)
        };
    },

    updateText: function(){
        var self = this;
        var index = 0;

        if(self.txtUseIntr){
            self.intrHandle = setInterval(function(){
                if(self.txt.length === index){
                    clearInterval(self.intrHandle);
                    return;
                }

                self.text && self.removeChild(self.text);
                self.text = self.createText(self.txt.slice(0, ++index));
                self.addChild(self.text);
            }, self.txtIntr);
        }
    },

    createText: function(txt){
        var self = this;
        return new Hilo.Text({
            maxWidth: self.width - 2 * self.txtX,
            text: txt,
            outline: false,
            color: self.txtColor,
            lineSpacing: self.txtLineSpacing,
            textAlign: self.txtAlign,
            font: self.txtFontSize + 'px ' + self.txtFontStyle,
            x: self.txtX,
            y: self.txtY
        });
    },

    ready: function(time){
        switch(this.type){
        case 'taping':
            this.updateText(time);
            break;
        case 'ltr':
            this.animateLTOR(time);
            break;
        case 'rtl':
            this.animateRTOL(time);
            break;
        case 'trtl':
            this.animateTRTOL(time);
            break;
        case 'last':
        default:
            this.animateDft(time);
            break;
        }
    },

    animateLTOR: function(time){
        var self = this;

        self.text = self.createText(self.txt);
        self.addChild(self.text);

        bm.tween.to(self, {
            alpha: 1,
            x: 40
        }, {
            duration: time || 2000
        });
    },

    animateRTOL: function(time){
        var self = this;

        self.text = self.createText(self.txt);
        self.addChild(self.text);

        bm.tween.to(self, {
            alpha: 1,
            x: bm.stage.width - self.width - 40
        }, {
            duration: time || 2000
        });
    },

    hideAnimateRTOL: function(time){
        var self = this;

        self.text = self.createText(self.txt);
        self.addChild(self.text);

        bm.tween.to(self, {
            alpha: 0
        }, {
            duration: time || 2000,
            onComplete: function(){
                bm.stage.removeChild(self);
            }
        });
    },

    animateDft: function(time){
        var self = this;

        self.text = self.createText(self.txt);
        self.addChild(self.text);

        bm.tween.to(self, {
            alpha: 1
        }, {
            duration: time || 2000
        });
    },

    animateTRTOL: function(time){
        var self = this;

        self.text = self.createText(self.txt);
        self.addChild(self.text);

        bm.tween.to(self, {
            alpha: 1,
            x: bm.stage.width - self.width - 30
        }, {
            duration: time || 2000
        });
    },

    hideAnimateTRTOL: function(){
        var self = this;
        bm.tween.to(self, {
            alpha: 0
        }, {
            duration: 2000,
            delay: 1000,
            onComplete: function(){
                bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);