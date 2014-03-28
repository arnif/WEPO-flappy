window.Pipe = (function() {
    'use strict';

    var SPEED = 30;
    var GAP = 150;


    var Pipe = function(elup, eldown, game) {
        this.elup = elup;
        this.eldown = eldown;
        this.game = game;
        this.pos = { x: 0, y: 0 };
    };

    // console.log(Pipe);

    Pipe.prototype.onFrame = function(delta) {

        this.pos.x -= delta * SPEED;

        this.elup.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');
        this.eldown.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');

        // console.log(this.el);
        // console.log(this.pos.x);

        if (this.pos.x < - this.game.WORLD_WIDTH) {
            // console.log('out of bounds');
            // console.log(this.pos.x - this.pos.x);
            this.pos.x = 10;
            var pipeHeight = getRandomInt(75, 400);
            pipeHeight = em(pipeHeight);
            // console.log('Pipe height ' + pipeHeight);

            //calculate upper pipe
            var upperHeight = this.game.WORLD_HEIGHT - (pipeHeight + em(GAP));
            console.log('Up Height ' + upperHeight);

            // pipeHeight = pipeHeight.toString();
            // console.log(pipeHeight);

            this.eldown.css('height', pipeHeight + 'em');
            this.elup.css('height', upperHeight + 'em');


            // this.elup.css('height', 'em('+ pipeHeight +'px)');


            // this.el.css('transform', 'translateZ(0) translateX(' + this.pos.x - this.pos.x + 'em)');

        }


    };

    function em(input) {
        var emSize = parseFloat($('.GameCanvas').css('font-size'));
        // console.log(emSize);
        return (input / emSize);
    }

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    return Pipe;

})();
