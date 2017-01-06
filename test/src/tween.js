(function(){

window.onload = function(){
    tw.init();
};

var tw = window.tw = {
    // instance class
    ticker: null,
    queue: null,
    stage: null,
    tween: Hilo.Tween,
    ease: Hilo.Ease,

    init: function(){
        this.stage = new Hilo.Stage({
            renderType:'canvas',
            container: document.body,
            width: window.screen.width,
            height: window.screen.height,
            background: '#ddd'
        });

        this.ticker = new Hilo.Ticker(60);
        this.ticker.addTick(this.stage);
        this.ticker.addTick(this.tween)
        this.ticker.start();

        this.loadImages();
    },

    loadImages: function(){
        var resources = [
            {id: 'phone1', src: 'images/phone_01.jpg'},
            {id: 'phone2', src: 'images/phone_02.jpg'}
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(){
        var self = this;
        var phone1 = this.queue.get('phone1').content;
        var phone2 = this.queue.get('phone2').content;

        var phone1Bmp = new Hilo.Bitmap({
            id: 'phone1',
            width: window.screen.width,
            height: window.screen.height,
            image: phone1,
            alpha: 1,
            rect: [0, 0, phone1.width, phone1.height]
        });

        var topDown = new window.TopDown({
            height: this.stage.height,
            width: this.stage.width,
            children: [phone1Bmp]
        });

        // topDown.addChild(phone1Bmp);
        topDown.registerTo(this.tween);
        topDown.on('loaded', function(){
            self.stage.removeChild(topDown);
        });

        var phone2Bmp = new Hilo.Bitmap({
            id: 'phone2',
            width: window.screen.width,
            height: window.screen.height,
            image: phone2,
            alpha: 1,
            rect: [0, 0, phone2.width, phone2.height]
        });

        var rightLeft = new window.RightLeft({
            height: this.stage.height,
            width: this.stage.width,
            children: [phone2Bmp]
        });

        // topDown.addChild(phone1Bmp);
        
        rightLeft.on('loaded', function(){
            self.stage.removeChild(rightLeft);
        });

        topDown.on('start', function(){
            rightLeft.registerTo(self.tween);
            self.stage.addChild(rightLeft);
        });
        this.stage.addChild(topDown);
        
        // var c = new Hilo.Container({
        //     children: [phone1Bmp],
        //     x: 0,
        //     y: -phone1.height,
        //     alpha: 0
        // });
        // this.stage.addChild(c);
        // this.tween.to(c, {
        //     x: 0,
        //     y: 0,
        //     alpha: 1
        // }, {
        //     duration: 1000,
        //     delay: 100,
        //     ease: this.ease.Quad.EaseIn,
        //     onComplete: function(){
        //         console.log('complete');
        //     }
        // });

        this.queue.off('complete');
    }
};

})();
