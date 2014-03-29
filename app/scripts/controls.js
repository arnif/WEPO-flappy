
window.Controls = (function() {
    'use strict';

    /**
     * Key codes we're interested in.
     */
    var KEYS = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        500: 'tap'
    };


    /**
     * A singleton class which abstracts all player input,
     * should hide complexity of dealing with keyboard, mouse
     * and touch devices.
     * @constructor
     */
    var Controls = function() {
        this._didJump = false;
        this.keys = {};
        this.gameStarted = false;
        $(window)
            .on('keydown', this._onKeyDown.bind(this))
            .on('keyup', this._onKeyUp.bind(this))
            .on('tap',this._onKeyUp('500'));
    };

    Controls.prototype._onKeyDown = function(e) {
        // Only jump if space wasn't pressed.
        if (e.keyCode === 32 && !this.keys.space) {
            this._didJump = true;
            if(!this.gameStarted){
                Controls.prototype.startGame();
            }
        }
        // Remember that this button is down.
        if (e.keyCode in KEYS || e === 500) {
            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = true;

            return false;
        }
    };

    Controls.prototype._onKeyUp = function(e) {
        if(e === -1 ){
            this._didJump = true;
        }

        if (e.keyCode in KEYS) {

            var keyName = KEYS[e.keyCode];
            this.keys[keyName] = false;
            return false;
        }
    };

    /**
     * Only answers true once until a key is pressed again.
     */
    Controls.prototype.didJump = function() {
        var answer = this._didJump;
        this._didJump = false;
        return answer;
    };

    Controls.prototype.startGame = function(){
        this.gameStarted = true;

    };

    // Export singleton.
    return new Controls();
})();
