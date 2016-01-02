'use strict';

require('./debug-conf');

var Game = require('./models/game');
var Player = require('./models/player');

var $placeHolder = document.getElementsByClassName('playground')[0];
var game = new Game($placeHolder);

game.addPlayer(new Player(game, { left: 37, right: 39 }));
// game.addPlayer(new Player(game, { left: 65, right: 68 }));

setInterval(function () {
    // game.clearPlayground();
}, 2000);

game.start();
