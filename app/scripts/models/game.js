'use strict';

var Utils = require('../common/utils');

function Game($playground) {
    if (!$playground) {
        throw new Error('Not found playground in DOM.');
    }

    var playgroundSize = Utils.getSize($playground);

    //NOTE:
    // Must be set. From specification:
    // Attributes width and height must have values that are valid non-negative integers.
    // The rules for parsing non-negative integers must be used to obtain their numeric values.
    $playground.width = playgroundSize.width;
    $playground.height = playgroundSize.height;

    this._playground = {
        $DOMReference: $playground,
        width: playgroundSize.width,
        height: playgroundSize.height,
        context: $playground.getContext('2d')
    };

    this._players = [];
}

Game.prototype.getPlayground = function getPlayground() {
    return this._playground;
};

Game.prototype.addPlayer = function addPlayer(player) {
    this._players.push(player);
};

Game.prototype.start = function start() {
    this._players.forEach(function (player) {
        player
            .draw(this._playground.width, this._playground.height)
            .move();
    }, this);
};

Game.prototype.clearPlayground = function clearPlayground() {
    this._playground.context.clearRect(0, 0, this._playground.width, this._playground.height);
};

module.exports = Game;
