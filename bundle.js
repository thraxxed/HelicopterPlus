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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Load Assets
var helicopter = new Image();
helicopter.src = 'https://i.imgur.com/tuHHozj.gif';
var background = new Image();
background.src = 'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/activities/star%20wars/2016/backgrounds/preview_75136_1440x838.jpg?l.r2=-326277714';
var obstacle = new Image();
obstacle.src = 'https://i.imgur.com/kDp3Vxp.png';
var topObstacle = new Image();
topObstacle.src = 'https://i.imgur.com/Ai9epP2.png?1';
var bee = new Image();
bee.src = 'https://vignette.wikia.nocookie.net/donkeykong/images/5/50/Buzz_Artwork_-_Donkey_Kong_Country_3.png/revision/latest?cb=20120311192435';
var projectile = new Image();
projectile.src = 'https://i.imgur.com/5nb5yVw.png?1';
var dead = new Image();
dead.src = 'https://i.imgur.com/qzTNUVS.png';

var shield = new Image();
shield.src = 'https://i.imgur.com/M7g9Xgt.png';

// Game Setup

var playerStartX = 50;
var playerStartY = 50;
var scrollSpeed = 1.8;
var gravity = 200;
var acceleration = -2.2;
var maxVelocity = 3;
var minVelocity = -1.5;

var playerX = playerStartX;
var playerY = playerStartY;
var velocityY = 1;
var canAccelerate = true;

// Obstacle
var obstacleX = canvas.width;
var obstacleWidth = 50;
var obstacleOffset = Math.random() * canvas.height * 1.25;
var obstacleHeight = canvas.height * 0.675;

// Bee
var BEE_START = 100;
var BEE_END = canvas.height - 50;
var BEE_X = 250;
var beeY = BEE_START;
var beeDy = 1.5;
var beeCooldown = false;

// Bee Projectile
var PROJECTILE_START = 245;
var projectileX = -110;
var projectileY = beeY;

// Powerups
var POWERUP_START = canvas.width + 100;
var powerUpX = POWERUP_START;
var powerUpY = 200;

var playerHasShield = false;
var playerInvulnerable = false;

var points = 0;
var gameOver = false;
var speedFlag = false;

function drawPlayer() {
  if (velocityY < maxVelocity) {
    velocityY += 0.03;
  }
  if (velocityY < -maxVelocity) {
    canAccelerate = false;
  } else {
    canAccelerate = true;
  }
  playerY += velocityY;
  if (playerHasShield) {
    ctx.drawImage(shield, playerX, playerY - 6.375, 50, 50);
  }
  ctx.drawImage(helicopter, playerX, playerY, 50, 31.25);

  if (playerY < 0) {
    playerY = 0;
    velocityY = 0;
  }
}

function drawObstacles() {
  obstacleX -= scrollSpeed;
  ctx.fillStyle = "FF0000";
  ctx.beginPath();
  var topPillarStart = -obstacleOffset;
  var topPillarEnd = topPillarStart + obstacleHeight;
  var bottomPillarStart = canvas.height - obstacleOffset + 50;
  var bottomPillarEnd = canvas.height - obstacleOffset + 50 + obstacleHeight;

  ctx.drawImage(topObstacle, obstacleX, topPillarStart, obstacleWidth + 20, obstacleHeight);
  ctx.drawImage(obstacle, obstacleX, bottomPillarStart, obstacleWidth + 20, obstacleHeight);
  if (obstacleX < -70) {
    obstacleOffset = Math.random() * canvas.height * 1.25;
    obstacleX = canvas.width;
  }
  ctx.fill();
  ctx.closePath();

  var xCollision = false;
  var yCollision = false;

  if (obstacleX + obstacleWidth > playerX && obstacleX < playerX + 31.25) {
    // console.log("danger zone");
    xCollision = true;
    if (playerY < topPillarEnd || playerY + 31.25 > bottomPillarStart && playerY < bottomPillarEnd) {
      // if (playerY + 31.25 > bottomPillarStart && playerY < bottomPillarEnd) console.log("yanger zone");
      yCollision = true;
    }
  }

  if (xCollision && yCollision) {
    gameOverFn();
    // clearInterval(renderLoop);
    // ctx.drawImage(dead, playerX, playerY, 50, 31.25);

    // gameOver = true;
  }
  xCollision = false;
  yCollision = false;
}

function drawBee() {
  beeY += beeDy;
  if (beeY < 0 || beeY > BEE_END) {
    beeDy *= -1;
  }
  if (!beeCooldown && Math.round(beeY) > Math.round(playerY) - 6 && Math.round(beeY) < Math.round(playerY) + 6) {
    beeCooldown = true;
    setTimeout(function () {
      return beeCooldown = false;
    }, 2000);
    shootProjectile();
  }
  ctx.drawImage(bee, BEE_X, beeY, 50, 50);
}

function drawProjectile() {
  if (projectileX > -100) projectileX -= scrollSpeed * 1.4;
  ctx.drawImage(projectile, projectileX, projectileY, 55, 20);

  // Check for Collision
  if (projectileX < playerX + 40 && projectileX + 45 > playerX) {
    // X Collision
    if (projectileY > playerY && projectileY < playerY + 20) {
      console.log("yes");
      gameOverFn();
    }
  }
}

function shootProjectile() {
  projectileX = BEE_X;
  projectileY = beeY;
}

function gameOverFn() {
  if (playerHasShield) {
    playerHasShield = false;
    playerInvulnerable = true;
    setTimeout(function () {
      return playerInvulnerable = false;
    }, 1000);
  }
  if (playerInvulnerable) return;
  ctx.font = "58px Comic Sans";
  ctx.fillStyle = 'red';
  ctx.fillText("GAME OVER", 120, 150);
  ctx.font = "28px Comic Sans";
  ctx.fillText("Press Space to Try Again", 145, 180);
  ctx.drawImage(dead, playerX, playerY, 50, 31.25);
  clearInterval(renderLoop);
  gameOver = true;
  gameStarted = false;
}

function keyDownHandler(e) {
  if (e.keyCode === 32) {
    if (!gameStarted) gameStarted = true;
    if (gameOver) {
      setTimeout(function () {
        return location.reload(true);
      }, 1000);
    }
    e.preventDefault();
    if (canAccelerate && velocityY > minVelocity) velocityY += acceleration;
  }
}

function drawPoints() {
  ctx.font = "18px Comic Sans";
  ctx.fillStyle = 'black';
  ctx.fillText("Score: " + Math.round(points), 380, 20);
  if (Math.round(points) % 50 === 0 && Math.round(points) !== 0) {
    if (!speedFlag) {
      console.log("Speeding up obstacles!");
      scrollSpeed += 0.05;
      speedFlag = false;
    }
    speedFlag = true;
  } else {
    speedFlag = false;
  }
}

function checkGameOver() {
  if (playerY > canvas.height - 10) {
    console.log("hey");
    gameOverFn();
  }
}

function draw() {
  if (!gameStarted) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawPoints();
  drawObstacles();
  drawProjectile();
  drawBee();
  checkGameOver();
  if (!powerupCooldown) {
    powerupCooldown = true;
    setTimeout(function () {
      return spawnPowerUp();
    }, 5000);
  }
  drawPowerUp();
  points += 0.02;
}

var gameStarted = false;

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawPlayer();
  ctx.font = "38px Comic Sans";
  ctx.fillStyle = 'red';
  ctx.fillText("Welcome to Helicopter+", 110, 150);
  ctx.font = "34px Comic Sans";
  ctx.fillText("Press space to accelerate", 125, 210);
}

var powerupCooldown = false;

function spawnPowerUp() {
  console.log("spawn a random powerup");
  powerUpX = POWERUP_START;
  powerupCooldown = false;
  // drawShield();
}

function drawPowerUp() {
  drawShield();
  console.log(playerHasShield);
}

function drawShield() {
  powerUpX -= scrollSpeed;
  ctx.drawImage(shield, powerUpX, powerUpY, 50, 50);
  // Check for collision with player
  if (powerUpX < playerX + 50 && powerUpX + 50 > playerX) {
    // X Collision
    if (powerUpY > playerY && powerUpY < playerY + 50) {
      playerHasShield = true;
      powerUpX = -200;
    }
  }
}

startGame();
var renderLoop = setInterval(draw, 10);

document.addEventListener("keydown", keyDownHandler, false);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map