(function(bm){

var Text = bm.Text = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,

    text: null,
    txt: null,

    // container config
    background: '#aaa', 

    // text config
    txtIntr: 100,
    txtUseIntr: false,
    txtIntrHandle: null,
    txtNumPerLine: 10,
    txtFontSize: 18,
    txtLineSpacing: 3,
    txtColor: '#fff',
    txtAlign: 'left',
    txtFontStyle: '楷体',
    txtX: 10,
    txtY: 10,

    constructor: function(text, type, perline){
        Text.superclass.constructor.call(this, {});

        // get scale relative to square image
        this.txtNumPerLine = perline || this.txtNumPerLine;
        var wh = this.calContainerWH(text);
        this.width = wh.w;
        this.height = wh.h;
        this.txt = text;
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
        case 'last':
            this.x = (bm.stage.width - this.width) / 2;
            this.y = (bm.stage.height - this.height) / 2;
            this.alpha = 0;
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

    updateText: function(){console.log('enter')
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
            color: self.txtColor,
            lineSpacing: self.txtLineSpacing,
            textAlign: self.txtAlign,
            font: self.txtFontSize + 'px ' + self.txtFontStyle,
            x: self.txtX,
            y: self.txtY
        });
    },

    start: function(){
        switch(this.type){
        case 'taping':
            this.updateText();
            break;
        case 'ltr':
            this.animateLTOR();
            break;
        case 'rtl':
            this.animateRTOL();
            break;
        case 'last':
            this.animateDft();
            break;
        default:
            this.animateDft();
            break;
        }
    },

    animateLTOR: function(){
        var self = this;

        self.text = self.createText(self.txt);
        self.addChild(self.text);

        bm.tween.to(self, {
            alpha: 1,
            x: 40
        }, {
            duration: 2000
        });
    },

    animateRTOL: function(){
        var self = this;

        self.text = self.createText(self.txt);
        self.addChild(self.text);

        bm.tween.to(self, {
            alpha: 1,
            x: bm.stage.width - self.width - 40
        }, {
            duration: 2000
        });
    },

    animateDft: function(){
        var self = this;

        self.text = self.createText(self.txt);
        self.addChild(self.text);

        bm.tween.to(self, {
            alpha: 1
        }, {
            duration: 2000
        });
    }
});

})(window.BM);