(function(){
var RightLeft = window.RightLeft = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Quad.EaseOut,
    constructor: function(obj){
        RightLeft.superclass.constructor.call(this, obj);

        this.alpha = 0;
        this.x = this.width;
    },

    registerTo: function(Tween){
        var self = this;

        Tween.to(self, {
            x: 0,
            alpha: 1
        }, {
            duration: 1000,
            ease: self.enterEase,
            onComplete: function(){
                self.hideNow(Tween);
            }
        });
    },

    // 淡出方式, 原地渐隐
    hideNow: function(Tween){
        var self = this;

        Tween.to(self, {
            alpha: 0
        }, {
            duration: 500,
            delay: 1000,
            ease: self.outEase,
            onComplete: function(){
                self.fire('loaded');
            }
        });
    }
});

})();