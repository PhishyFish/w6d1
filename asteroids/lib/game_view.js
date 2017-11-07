const GameView = function GameView(hash) {
  this.game = hash.game;
  this.ctx = hash.ctx;
};

GameView.prototype.start = function start() {
  setInterval(this.game.moveObjects, 20);
  setInterval(this.game.draw, 20);
};

module.exports = GameView;
