const Asteroid = require("./asteroid");

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 20;

function Game() {
  this.asteroids = [];
  this.bullets = [];
  this.ships = [];
  //we called add asteroids!
  this.addAsteroids();

}


Game.prototype.addAsteroids = function() {

    for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid({game:this}));
    }
};

Game.prototype.randomPosition = function randomPosition() {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(function(aroid){

    aroid.draw(ctx);

  });
};

Game.prototype.moveObjects = function moveObjects() {
  this.asteroids.forEach(function(aroid) {
    aroid.move();
  });
};

module.exports = Game;
