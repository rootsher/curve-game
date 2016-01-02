'use strict';

var Utils = require('../common/utils');

function Player(game, controls) {
    this._game = game;
    this._controls = controls;

    this._default = {
        width: 3, // 10
        height: 10
    };

    this._current = { x: undefined, y: undefined };
    this._motionVector = { x: 0, y: 0 };
    this._moves = [];
}

Player.Motion = function (x, y) {
    this.x = x;
    this.y = y;
    this.parameters = {};
};

Player.prototype.draw = function draw() {
    var self = this;
    var playground = this._game.getPlayground();

    var randomPosition = {
        x: (Utils.getRandomFromRange(0, playground.width) - this._default.width),
        y: (Utils.getRandomFromRange(0, playground.height) - this._default.height)
    };

    this._current.x = randomPosition.x;
    this._current.y = randomPosition.y;

    var xRandom = (2 * Math.random() - 1);
    var yRandom = (2 * Math.random() - 1);

    this._motionVector.x = (xRandom / Math.sqrt(Math.pow(xRandom, 2) + Math.pow(yRandom, 2)));
    this._motionVector.y = (yRandom / Math.sqrt(Math.pow(xRandom, 2) + Math.pow(yRandom, 2)));

    //DEBUG:
    console.log('randomPosition', randomPosition);

    this.move();

    function calculateVectorPosition(angle) {
        return {
            x: ((self._motionVector.x * Math.cos(angle)) - (self._motionVector.y * Math.sin(angle))),
            y: ((self._motionVector.x * Math.sin(angle)) + (self._motionVector.y * Math.cos(angle)))
        };
    }

    window.addEventListener('keydown', function (event) {
        var keyCode = event.keyCode;
        var direction;

        if (keyCode === self._controls.left) {
            direction = -1;
        } else if (keyCode === self._controls.right) {
            direction = 1;
        }

        if (!direction) {
            return;
        }

        var vectorPosition = calculateVectorPosition(((direction * 2) * Math.PI) / 60);

        self._motionVector.x = vectorPosition.x;
        self._motionVector.y = vectorPosition.y;
    });

    return this;
};

Player.prototype.move = function move() {
    var x = this._current.x += this._motionVector.x;
    var y = this._current.y += this._motionVector.y;

    var context = this._game.getPlayground().context;

    //NOTE: Tests drawing.
    context.beginPath();
    context.arc(x, y, this._default.width, 0, Math.PI * 2, true);
    context.fillStyle = 'red';
    context.closePath();
    context.fill();
    //this._game.getPlayground().context.fillRect(x, y, this._default.width, this._default.height);

    this._moves.push(new Player.Motion(x, y));

    var requestID = window.setTimeout(this.move.bind(this), 16);

    if ((this._current.y <= 0) ||
        (this._current.x <= 0) ||
        (this._current.x >= this._game.getPlayground().width) ||
        (this._current.y >= this._game.getPlayground().height)
    ) {
        document.querySelector('.game .info').classList.remove('hidden');
        window.clearTimeout(requestID);
    }
};

module.exports = Player;
