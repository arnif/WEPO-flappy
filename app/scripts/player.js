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
        this.scorePipe = '';
        this.velocity = 0;
	};


	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
        this.game.score = 0;
        this.scorePipe = '';
        this.velocity = 0;
        $('.Game-Score').show();
        $('.Game-Score').html('0');

	};

	Player.prototype.onFrame = function(delta) {

        // console.log(Controls.didJump());

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

        if ((Controls.keys.space || Controls.keys.mousedown)) {
            // console.log('jump!!');

            if (this.pos.y < -1) {
                // console.log('over the border');

            } else {

                this.pos.y -= delta * SPEED + 0.6;
                this.velocity = 0;

                $('.Wing').css('transform', 'translateZ(0) rotate(35deg)');
                // $('.Player-Container').css('transform', 'translateZ(0) rotate(-45deg)');
                document.getElementById('flapp').play();

            }

            // d = Controls.didJump();

        } else {
            this.pos.y += delta * SPEED + this.velocity;
            this.velocity += SPEED * 0.0005;
            $('.Wing').css('transform', 'translateZ(0) rotate(0)');
            // $('.Player-Container').css('transform', 'translateZ(0) rotate(45deg)');


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


                if (lowerPipePosY < playerY + HEIGHT || topPipePosY > playerY) {
                    // console.log('collision');
                    $('.Game-Score').hide();
                    // console.log('Player Y ' + playerY);
                    // console.log('Lower Pipe Y ' + lowerPipePosY);

                    // return this.game.gameover();

                } else {

                    if (this.scorePipe !== this.game.pipe.pipeArr[i].name) {
                        this.game.score += 1;
                        $('.Game-Score').html(this.game.score);
                        this.scorePipe = this.game.pipe.pipeArr[i].name;

                        // console.log(this.game.score);
                    }
                }
            }

        }
    };

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - 2) {
			return this.game.gameover();
		}
	};

	return Player;

})();
