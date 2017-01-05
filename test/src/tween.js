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
            height: 400,
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
            {id: 'phone2', src: 'images/phone_01.jpg'}
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(){
        var phone1 = this.queue.get('phone1').content;

        var phone1Bmp = new Hilo.Bitmap({
            id: 'phone1',
            width: 100,
            height: 100,
            image: phone1,
            alpha: 1,
            rect: [0, 0, phone1.width, phone1.height]
            // align: Hilo.align.CENTER
        });

        var c = new Hilo.Container({
            children: [phone1Bmp],
            x: -100,
            y: -100,
            alpha: 0
        });
        this.stage.addChild(c);
        this.tween.to(c, {
            x: 200,
            y: 200,
            alpha: 1
        }, {
            duration: 1000,
            delay: 100,
            ease: this.ease.Quad.EaseIn,
            onComplete: function(){
                console.log('complete');
            }
        });

        this.queue.off('complete');
    }
};

})();
