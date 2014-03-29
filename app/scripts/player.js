window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};


	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {

		// if (Controls.keys.right) {
		// 	this.pos.x += delta * SPEED;
		// }
		// if (Controls.keys.left) {
		// 	this.pos.x -= delta * SPEED;
		// }
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}
        if (Controls.keys.space) {
            // console.log('jump!!');

            if (this.pos.y + HEIGHT < 0) {
                console.log('over the border');
                return;
            }

            this.pos.y -= delta * 2 * SPEED;

            $('.Wing').css('transform', 'translateZ(0) rotate(35deg)');

            document.getElementById('flapp').play();

        } else {
            this.pos.y += delta * 1.2 * SPEED;
            $('.Wing').css('transform', 'translateZ(0) rotate(0)');


        }

		this.checkCollisionWithBounds();
        this.checkCollisionWithPipes();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

        // var pipex = parseInt($('.Pipe').css('left'));
        // pipex += delta * SPEED;
        // console.log(pipex);


	};

    Player.prototype.checkCollisionWithPipes = function() {
        // console.log(this.game.pipe);
        var playerX = this.pos.x;
        var playerY = Math.floor(this.pos.y);
        // console.log('Player X ' + playerX);

        for (var i = 0; i < this.game.pipe.pipeArr.length; i++) {

            var pipePosX = Math.floor(this.game.pipe.pipeArr[i].bottom.pos.x);

            var lowerPipePosY = this.game.pipe.pipeArr[i].bottom.pipe[0].style.height;
            var topPipePosY = this.game.pipe.pipeArr[i].top.pipe[0].style.height;
            // console.log('Pipe X ' + -pipePosX);
            lowerPipePosY = Math.floor(this.game.WORLD_HEIGHT - lowerPipePosY.substring(0, lowerPipePosY.length - 2));
            topPipePosY = Math.floor(topPipePosY.substring(0, topPipePosY.length - 2));
            // console.log('PipePOS start  '  + (-pipePosX));
            // console.log('PipePOS end   ' + (-pipePosX - WIDTH * 2));
            if (-pipePosX >= playerX + WIDTH && (-pipePosX - WIDTH * 2) <= playerX + WIDTH ) {
                // console.log('between');
                // console.log('Player Y ' + playerY);
                // console.log('Pipe Y ' + topPipePosY);
                // console.log('SAME X');
                // console.log(lowerPipePosY);

                if (lowerPipePosY < playerY + HEIGHT || topPipePosY > playerY) {
                    console.log('collision');
                    // console.log('Player Y ' + playerY);
                    // console.log('Lower Pipe Y ' + lowerPipePosY);

                    return this.game.gameover();
                }
            }
        }
    };

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
