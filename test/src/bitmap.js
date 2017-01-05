(function(){

window.onload = function(){
    stage.init();
};

var stage = window.stage = {
    width: window.screen.width,
    height: 400,
    scale: 1,
    background: '#ddd',

    stage: null,

    // instance class
    ticker: null,
    queue: null,

    useTicker: true,

    init: function(){
        //舞台
        this.stage = new Hilo.Stage({
            renderType:'canvas',
            container: document.body,
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale,
            background: this.background
        });

        this.loadImages();
        this.isUseTicker();
    },

    isUseTicker: function(){
        if(this.useTicker){
            this.ticker = new Hilo.Ticker(20);
            this.ticker.addTick(this.stage);
            this.ticker.start();
        }else{
            this.stage.tick(20);
        }
    },

    loadImages: function(){
        var resources = [
            {id: 'phone', src: 'images/icon_phone.png'},
            {id: 'two', src: 'images/icon_two.png'}
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(){
        var phone = this.queue.get('phone').content;
        var two = this.queue.get('two').content;

        var bmp = new Hilo.Bitmap({
            id: 'phone',
            image: phone,
            background: this.background,
            rect: [0, 0, phone.width, phone.height],
            align: Hilo.align.CENTER
        });

        var bmp2 = new Hilo.Bitmap({
            id: 'two',
            image: two,
            background: this.background,
            rect: [0, 0, 200, 200],
            align: Hilo.align.CENTER,
            depth: 1
        });

        let change = 1;
        setInterval(() => {
            if(change === 1){
                this.stage.removeFromParent(bmp);
                this.stage.addChild(bmp2);
                change = 2;
            }else{
                this.stage.removeFromParent(bmp2);
                this.stage.addChild(bmp);
                change = 1;
            }
        }, 1000);
        this.queue.off('complete');
    }
};

})();
