var game = new Game(document.getElementsByClassName('playground')[0]);

game.addPlayer(new Player(game, { left: 37, right: 39 }));
//game.addPlayer(new Player(game, { left: 65, right: 68 }));

/*setInterval(function () {
    game.clearPlayground();
}, 2000);*/

game.start();