/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  inherits(ChildClass, BaseClass) {
     ChildClass.prototype = Object.create(BaseClass.prototype);
     ChildClass.prototype.constructor = ChildClass;
   },

   randomVec (length) {
     const deg = 2 * Math.PI * Math.random();
     return Util.scale([Math.sin(deg), Math.cos(deg)], length);
   },
   // Scale the length of a vector by the given amount.
   scale (vec, m) {
     return [vec[0] * m, vec[1] * m];
   }




};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(2);
const Game = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,1000,600);




  const game = new Game();
  new GameView(game, ctx).start();
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const GameView = function GameView(hash) {
  this.game = hash.game;
  this.ctx = hash.ctx;
};

GameView.prototype.start = function start() {
  setInterval(this.game.moveObjects, 20);
  setInterval(this.game.draw, 20);
};

module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(4);

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(5);


const DEFAULTS = {
  COLOR: "#505050",
  RADIUS: 100,
  SPEED: 4
};





const Asteroid = function Asteroid(options = {}) {
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
};


//
Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);


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


/***/ })
/******/ ]);