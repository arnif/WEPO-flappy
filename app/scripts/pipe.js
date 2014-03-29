window.Pipe = (function() {
    'use strict';

    var SPEED = 30;
    var GAP = 15;
    var divide = 2;
    var multiPipe2 = 1;
    var multiPipe3 = 2;
    // var PIPE1_START = 0;
    // var PIPE2_START = this.game.WORLD_WIDTH / 2;
    // var PIPE3_START = this.game.WORLD_WIDTH / 2 * 2;


    var PipeEl = function(pipe, xCord, yCord) {

        this.pipe = pipe;
        // this.eldown = eldown;
        // this.game = game;
        this.pos = { x: xCord, y: yCord };

    };

    var Pipe = function(el, game) {

        this.el = el;
        this.game = game;
        this.pipeArr = [
                { name: 'First', top: new PipeEl(this.el.find('.Pipeup1'), 0, 0), bottom: new PipeEl(this.el.find('.Pipedown1'), 0, 0) },
                { name: 'Sec', top: new PipeEl(this.el.find('.Pipeup2'), (this.game.WORLD_WIDTH / divide) * multiPipe2, 0), bottom: new PipeEl(this.el.find('.Pipedown2'), (this.game.WORLD_WIDTH / divide) * multiPipe2, 0) },
                { name: 'Third', top: new PipeEl(this.el.find('.Pipeup3'), (this.game.WORLD_WIDTH / divide) * multiPipe3, 0), bottom: new PipeEl(this.el.find('.Pipedown3'), (this.game.WORLD_WIDTH / divide) * multiPipe3, 0) }
            ];

    };

    Pipe.prototype.reset = function() {

        for (var i = 0; i < this.pipeArr.length; i++) {

            var pipeHeight = getRandomInt(7.5, 40);

            var upperHeight = this.game.WORLD_HEIGHT - (pipeHeight + GAP);

            if (this.pipeArr[i].name === 'First') {
                // console.log('first pipes');
                this.pipeArr[i].top.pos.x = 0;
                this.pipeArr[i].bottom.pos.x = 0;

            } else if (this.pipeArr[i].name === 'Sec') {
                // console.log('sec pipes');
                this.pipeArr[i].top.pos.x = (this.game.WORLD_WIDTH / divide) * multiPipe2;
                this.pipeArr[i].bottom.pos.x = (this.game.WORLD_WIDTH / divide) * multiPipe2;
            } else if (this.pipeArr[i].name === 'Third') {
                // console.log('third pipes');
                this.pipeArr[i].top.pos.x = (this.game.WORLD_WIDTH / divide) * multiPipe3;
                this.pipeArr[i].bottom.pos.x = (this.game.WORLD_WIDTH / divide) * multiPipe3;
            }

            this.pipeArr[i].top.pipe.css('height', pipeHeight + 'em');
            this.pipeArr[i].bottom.pipe.css('height', upperHeight + 'em');

        }
    };


    Pipe.prototype.onFrame = function(delta) {

        // console.log(this.pipeArr);

        for (var i = 0; i < this.pipeArr.length; i++) {
            // console.log(this.pipeArr[i].top.pos.x);

            this.pipeArr[i].top.pos.x -= delta * SPEED;
            this.pipeArr[i].bottom.pos.x -= delta * SPEED;


            this.pipeArr[i].top.pipe.css('transform', 'translateZ(0) translateX(' + this.pipeArr[i].top.pos.x + 'em)');
            this.pipeArr[i].bottom.pipe.css('transform', 'translateZ(0) translateX(' + this.pipeArr[i].bottom.pos.x + 'em)');


            // console.log(this.pipeArr[i].top.pstart);
            if (this.pipeArr[i].top.pos.x < - this.game.WORLD_WIDTH) {


                this.pipeArr[i].top.pos.x = 40;
                this.pipeArr[i].bottom.pos.x = 40;


                var pipeHeight = getRandomInt(7.5, 40);
                // pipeHeight = em(pipeHeight);

                //calculate upper pipe
                var upperHeight = this.game.WORLD_HEIGHT - (pipeHeight + GAP);
                // console.log(this.pipeArr[i].top.pipe);
                this.pipeArr[i].top.pipe.css('height', pipeHeight + 'em');
                this.pipeArr[i].bottom.pipe.css('height', upperHeight + 'em');

            }


        }



    };


    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    return Pipe;

})();
