(function(stage){


window.onload = function(){
    entry.init();
};

var entry = window.entry = {
    width: 400,
    height: 400,

    stage: null,

    scale: 0.5,

    init: function(){
        //舞台
        this.stage = new Hilo.Stage({
            renderType:'canvas',
            container: document.body,
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale
        });

        var ticker = new Hilo.Ticker(20);
        ticker.addTick(this.stage);
        ticker.start();

        var txt = new Hilo.Text({
            text: 'hello',
            font: "40px arial"
        }).addTo(this.stage, 1);

        // var elem = new Hilo.DOMElement({
        //         element: Hilo.createElement('div', {
        //             innerHTML: content,
        //             style: {
        //                 position: 'absolute',
        //                 font: font
        //             }
        //         }),
        //         width: 250,
        //         height: 100,
        //         x: 40,
        //         y: 150,
        //     }).addTo(this.stage);
    }
};

})(window.stage);
