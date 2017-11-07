const Util = require("./util");


function MovingObject(attributes) {
  this.pos = attributes.pos;
  this.vel = attributes.vel;
  this.radius = attributes.radius;
  this.color = attributes.color;
  this.game = attributes.game;
}

MovingObject.prototype.draw = function(ctx) {
  //dis takes an object
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function(){
  let posX = this.pos[0];
  let posY = this.pos[1];
  let velX = this.vel[0];
  let velY = this.vel[1];

  this.pos = [posX + velX, posY + velY];
};

module.exports = MovingObject;
