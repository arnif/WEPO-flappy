window.Pipe = (function() {
    'use strict';

    var SPEED = 30;


    var Pipe = function(el, game) {
        this.el = el;
        this.game = game;
        this.pos = { x: 0, y: 0 };
    };

    // console.log(Pipe);

    Pipe.prototype.onFrame = function(delta) {

        this.pos.x -= delta * SPEED;

        this.el.css('transform', 'translateZ(0) translateX(' + this.pos.x + 'em)');

        // console.log(this.el);
        // console.log(this.pos.x);

        if (this.pos.x < - this.game.WORLD_WIDTH) {
            // console.log('out of bounds');
            // console.log(this.pos.x - this.pos.x);
            this.pos.x = 0;
            // this.el.css('transform', 'translateZ(0) translateX(' + this.pos.x - this.pos.x + 'em)');

        }


    };


    return Pipe;

})();
