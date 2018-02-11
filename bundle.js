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

var scrollSpeed = 2;
var trackOneStartPos = 100;
var trackTwoStartPos = 660;
var trackThreeStartPos = 1700;

var midair = false;

var cartX = 120;
var cartY = 180;

var cartDy = 0;

var trackHeight = 180;

function drawTracks() {
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.rect(trackOneStartPos -= scrollSpeed, 200, canvas.width, 20);
  if (trackOneStartPos + 480 < 120) {
    midair = true;
    console.log("You can fall!");
    trackHeight = 600;
  }
  ctx.rect(trackTwoStartPos -= scrollSpeed, 200, canvas.width * 3, 20);
  if (trackTwoStartPos - scrollSpeed < 120) trackHeight = 180;
  ctx.rect(trackThreeStartPos -= scrollSpeed, 200, canvas.width * 3, 20);
  ctx.fill();
  ctx.closePath();
}

function drawCart() {
  if (midair) cartDy += 0.5;
  ctx.beginPath();
  ctx.fillStyle = "FF0000";
  cartY += cartDy;
  if (cartY >= trackHeight) {
    midair = false;
    cartY = 180;
  }
  if (cartY > canvas.height) {
    clearInterval(renderLoop);
  }
  ctx.rect(cartX, cartY, 30, 20);
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCart();
  drawTracks();
}

function jump() {
  if (!midair) {
    midair = true;
    cartDy = -13;
    console.log("jump!");
  }
}

function keyDownHandler(e) {
  if (e.keyCode === 32) {
    jump();
  }
}

document.addEventListener("keydown", keyDownHandler, false);

var renderLoop = setInterval(draw, 10);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map