
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

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

    $('#mute').click(function () {
        // console.log('sid');
        mute();
    });

    $('.GameCanvas').keypress(function(event) {
        // console.log(event);
        if (event.keyCode === 109) {
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
		var keyframes = findKeyframesRule('animatedBackground');

        document.getElementById('gameover').play();

        // remove the existing 0% and 100% rules
        keyframes.deleteRule('100%');
        keyframes.deleteRule('0');

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
        $('.Score').html(this.score);

		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	//This function can find any keyframe given the keyframes name.
	function findKeyframesRule(rule)
    {
        // gather all stylesheets into an array
        var ss = document.styleSheets;

        // loop through the stylesheets
        for (var i = 0; i < ss.length; ++i) {

            // loop through all the rules
            for (var j = 0; j < ss[i].cssRules.length; ++j) {

                // find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
                if (ss[i].cssRules[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name === rule){
                    return ss[i].cssRules[j];
                }
            }
        }

        // rule not found
        return null;
    }

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 80;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


