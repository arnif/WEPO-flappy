
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {

		this.el = el;

        this.player = new window.Player(this.el.find('.Player'), this);
        this.pipe = new window.Pipe(el, this);
		this.isPlaying = false;
        this.score = -1;
        this.highscore = 0;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);

        checkSize();
	};

    $(window).resize(function() {
        checkSize();
    });

    function checkSize() {
        console.log('resize');
        var w = window.innerWidth / 80;
        var h = window.innerHeight / 57.6;

        var px = Math.min(w,h);

        if (px > 10 ) {
            px = 10;
        }
        $('.GameCanvas').css('font-size',  px+'px');

    }

    $('#mute').click(function () {
        // console.log('sid');
        mute();
    });

    $(window).keydown(function(event) {
        // console.log(event);
        if (event.keyCode === 77) {
            mute();
        }
    });

    function mute() {

        var audioPlayer = $('#themusic')[0];
        // console.log(audioPlayer);
        var effect = $('#flapp')[0];
        var over = $('#gameover')[0];


        if(audioPlayer.muted === false) {
            $('#mute').html('Unmute');
            audioPlayer.muted = true;
            effect.muted = true;
            over.muted = true;
        } else {
            $('#mute').html('Mute');
            audioPlayer.muted = false;
            effect.muted = false;
            over.muted = false;
        }
    }


	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
        this.pipe.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {


		// Restart the onFrame loop
        $('.Grass').css('animation-play-state', 'running', '-webkit-animation-play-state', 'running');
        $('.Background').css('animation-play-state', 'running', '-webkit-animation-play-state', 'running');


		if (this.score === -1) {

		// Should be refactored into a Scoreboard class.

			var that = this;
			var StartEl = this.el.find('.Start');

			StartEl
				.addClass('is-visible')
				.find('.Start-restart')
					.one('click', function() {
						console.log('hi');
						StartEl.removeClass('is-visible');

						//that.start();
						that.reset();
						that.lastFrame = +new Date() / 1000;
						window.requestAnimationFrame(that.onFrame);
						that.isPlaying = true;
						that.score = 0;
                        $('.Player').show();
					});
		} else {
			this.reset();
			this.lastFrame = +new Date() / 1000;
			window.requestAnimationFrame(this.onFrame);
			this.isPlaying = true;
			this.score = 0;

		}

    };

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
        this.pipe.reset();

	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

        document.getElementById('gameover').play();

        $('.Grass').css('animation-play-state', 'paused', '-webkit-animation-play-state', 'paused');
        $('.Background').css('animation-play-state', 'paused', '-webkit-animation-play-state', 'paused');

        if (this.score > this.highscore) {
            this.highscore = this.score;
        }
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
        $('.Score').html(this.score);
        $('.High-score').html(this.highscore);

		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};


	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 80;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


