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

var renderLoop = setInterval(draw, 10);
var helicopter = new Image();
helicopter.src = 'https://i.imgur.com/tuHHozj.gif';
var background = new Image();
background.src = 'https://t0.rbxcdn.com/d7ca67278858823d19c95902aa84494c';

// Initial Variable Declarations

var playerStartX = 50;
var playerStartY = 50;
var scrollSpeed = 2;
var gravity = 1.015;
var acceleration = -1.04;
var maxVelocity = 2.45;

var playerX = playerStartX;
var playerY = playerStartY;
var velocityY = 1;
var canAccelerate = true;
var points = 0;
var obstacleX = canvas.width;
var obstacleWidth = 70;
var obstacleOffset = 0;
var gameOver = false;
obstacleOffset = Math.random() * canvas.height * 1.25;

function setupGame() {
  playerX = playerStartX;
  playerY = playerStartY;
  velocityY = 1;
  canAccelerate = true;
  points = 0;
  obstacleX = canvas.width;
  obstacleWidth = 70;
  obstacleOffset = 0;
  gameOver = false;
}

function drawPlayer() {
  if (velocityY < maxVelocity) {
    velocityY += 0.02;
  }
  if (velocityY < -maxVelocity) {
    canAccelerate = false;
  } else {
    canAccelerate = true;
  }
  playerY += velocityY;
  ctx.drawImage(helicopter, playerX, playerY, 50, 31.25);
  if (playerY > canvas.height + 31.25) {
    clearInterval(renderLoop);
    ctx.fillText("GAME OVER", 220, 150);
    gameOver = true;
  }
  if (playerY < 0) {
    playerY = 0;
    velocityY = 0;
  }
}

function drawObstacles() {
  obstacleX -= scrollSpeed;
  ctx.fillStyle = "FF0000";
  ctx.beginPath();
  ctx.fillRect(obstacleX, 0 - obstacleOffset, obstacleWidth, canvas.height * 0.7);
  ctx.fillRect(obstacleX, canvas.height - obstacleOffset + 100, obstacleWidth, canvas.height * 0.7);
  if (obstacleX < -70) {
    obstacleOffset = Math.random() * canvas.height * 1.25;
    obstacleX = canvas.width;
  }
  ctx.fill();
  ctx.closePath();
}

function keyDownHandler(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
    if (canAccelerate) velocityY += acceleration;
  }
}

function drawPoints() {
  ctx.fillText("" + Math.round(points), 450, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawPoints();
  drawObstacles();
  points += 0.00625;
}

document.addEventListener("keydown", keyDownHandler, false);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map