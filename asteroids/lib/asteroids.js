const GameView = require("./game_view");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,1000,600);




  const game = new Game();
  new GameView(game, ctx).start();
});
