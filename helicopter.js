let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

const renderLoop = setInterval(draw, 10);
const helicopter = new Image();
helicopter.src = 'https://i.imgur.com/tuHHozj.gif';
const background = new Image();
background.src = 'https://t0.rbxcdn.com/d7ca67278858823d19c95902aa84494c';

// Initial Variable Declarations

const playerStartX = 50;
const playerStartY = 50;
const scrollSpeed = 2;
const gravity = 1.015;
const acceleration = -1.04;
const maxVelocity = 2.45;

let playerX = playerStartX;
let playerY = playerStartY;
let velocityY = 1;
let canAccelerate = true;
let points = 0;
let obstacleX = canvas.width;
let obstacleWidth = 70;
let obstacleOffset = 0;
let gameOver = false;
obstacleOffset = (Math.random() * canvas.height * 1.25)

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
  ctx.fillRect(obstacleX, 0 - obstacleOffset, obstacleWidth, canvas.height*0.7);
  ctx.fillRect(obstacleX, canvas.height - obstacleOffset + 100, obstacleWidth, canvas.height*0.7);
  if (obstacleX < -70) {
    obstacleOffset = (Math.random() * canvas.height * 1.25)
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
  ctx.fillText(`${Math.round(points)}`, 450, 20);
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
