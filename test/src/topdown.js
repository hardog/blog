(function(){
var TopDown = window.TopDown = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Quad.EaseIn,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(obj){
        TopDown.superclass.constructor.call(this, obj);

        this.alpha = 0;
        this.x = 0;
        this.y = -this.height;
    },

    registerTo: function(Tween){
        var self = this;

        Tween.to(self, {
            x: 0,
            y: 0,
            alpha: 1
        }, {
            duration: 1000,
            ease: self.enterEase,
            onComplete: function(){
                self.hideRtoL(Tween);
            }
        });
    },

    // 淡出方式, right => left
    hideRtoL: function(Tween){
        var self = this;

        Tween.to(self, {
            alpha: 0,
            x: -self.width
        }, {
            duration: 1050,
            delay: 1000,
            ease: self.outEase,
            onStart: function(){
                self.fire('start');
            },
            onComplete: function(){
                self.fire('loaded');
            }
        });
    }
});

})();