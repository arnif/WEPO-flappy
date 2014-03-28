window.Pipe = (function() {
    'use strict';

    var SPEED = 30;
    var GAP = 150;


    var PipeEl = function(pipe) {

        this.pipe = pipe;
        // this.eldown = eldown;
        // this.game = game;
        this.pos = { x: 0, y: 0 };
    };

    var Pipe = function(el, game) {

        this.el = el;
        this.pipeArr = [
                { name: 'First', top: new PipeEl(this.el.find('.Pipeup1')), bottom: new PipeEl(this.el.find('.Pipedown1')) },
                { name: 'Sec', top: new PipeEl(this.el.find('.Pipeup2')), bottom: new PipeEl(this.el.find('.Pipedown2')) },
                { name: 'Third', top: new PipeEl(this.el.find('.Pipeup3')), bottom: new PipeEl(this.el.find('.Pipedown3')) }
            ];
        this.game = game;

    };


    // console.log(Pipe);

    Pipe.prototype.onFrame = function(delta) {

        // console.log(this.pipeArr);

        for (var i = 0; i < this.pipeArr.length; i++) {
            console.log(this.pipeArr[i].top.pos.x);

            this.pipeArr[i].top.pos.x -= delta * SPEED;



            this.pipeArr[i].top.pipe.css('transform', 'translateZ(0) translateX(' + this.pipeArr[i].top.pos.x + 'em)');
            this.pipeArr[i].bottom.pipe.css('transform', 'translateZ(0) translateX(' + this.pipeArr[i].top.pos.x + 'em)');



            if (this.pipeArr[i].top.pos.x < - this.game.WORLD_WIDTH) {

                this.pipeArr[i].top.pos.x = 10;
                var pipeHeight = getRandomInt(75, 400);
                pipeHeight = em(pipeHeight);

                //calculate upper pipe
                var upperHeight = this.game.WORLD_HEIGHT - (pipeHeight + em(GAP));
                console.log(this.pipeArr[i].top.pipe);
                this.pipeArr[i].top.pipe.css('height', pipeHeight + 'em');
                this.pipeArr[i].bottom.pipe.css('height', upperHeight + 'em');

            }


        }

       // this.pos.x -= delta * SPEED;

        // console.log(this.elup);

        // $.each(this.elup, function(key, value) {
        //     // console.log(key);
        //     // console.log(value);
        //     console.log('out');

        //     for (var i = 0; i < value.length; i++) {
        //         console.log(value[i]);
        //         // value[i].css('transform', 'translateZ(0) translateX(' + x + 'em)');
        //     }

        // });

        // for (var i = 0; i < this.elup.length; i ++) {
            // console.log(this.elup[i]);


            // for (var j = 0; j < this.elup[i].length; j++) {
                // this.elup[i].First[j].css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
                // this.eldown.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
            // }

            // if (this.pos.x < - this.game.WORLD_WIDTH) {

            //     this.pos.x = 10;
            //     var pipeHeight = getRandomInt(75, 400);
            //     pipeHeight = em(pipeHeight);

            //     //calculate upper pipe
            //     var upperHeight = this.game.WORLD_HEIGHT - (pipeHeight + em(GAP));

            //     // this.eldown.css('height', pipeHeight + 'em');
            //     this.elup[i].css('height', upperHeight + 'em');

            // }


        // }




    };

    function em(input) {
        var emSize = parseFloat($('.GameCanvas').css('font-size'));
        return (input / emSize);
    }

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    return Pipe;

})();
