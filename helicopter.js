let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Load Assets

let renderLoop = setInterval(draw, 10);
const helicopter = new Image();
helicopter.src = 'https://i.imgur.com/tuHHozj.gif';
const background = new Image();
background.src = 'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/activities/star%20wars/2016/backgrounds/preview_75136_1440x838.jpg?l.r2=-326277714';
const obstacle = new Image();
obstacle.src = 'https://i.imgur.com/kDp3Vxp.png';
const topObstacle = new Image();
topObstacle.src = 'https://i.imgur.com/Ai9epP2.png?1';

const dead = new Image();
dead.src = 'https://i.imgur.com/qzTNUVS.png';

// Initial Variable Declarations

const playerStartX = 50;
const playerStartY = 50;
const scrollSpeed = 1.8;
const gravity = 200;
const acceleration = -2.2;
const maxVelocity = 3;
const minVelocity = -1.5;

let playerX = playerStartX;
let playerY = playerStartY;
let velocityY = 1;
let canAccelerate = true;
let points = 0;
let obstacleX = canvas.width;
let obstacleWidth = 50;
let obstacleOffset = (Math.random() * canvas.height * 1.25)
let obstacleHeight = canvas.height * 0.675;
let gameOver = false;

function setupGame() {
  console.log("hey");
  playerX = playerStartX;
  playerY = playerStartY;
  velocityY = 1;
  canAccelerate = true;
  points = 0;
  obstacleX = canvas.width;
  obstacleWidth = 50;
  obstacleOffset = (Math.random() * canvas.height * 1.25)
  obstacleHeight = canvas.height * 0.675;
  gameOver = false;
}

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
  // console.log(velocityY);
  // console.log(helicopter.src);
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
  let topPillarStart = -obstacleOffset;
  let topPillarEnd = topPillarStart + obstacleHeight;
  let bottomPillarStart = canvas.height - obstacleOffset + 50;
  let bottomPillarEnd = canvas.height - obstacleOffset + 50 + obstacleHeight;

  // ctx.fillRect(obstacleX, topPillarStart, obstacleWidth, obstacleHeight);
  ctx.drawImage(topObstacle, obstacleX, topPillarStart, obstacleWidth+20, obstacleHeight)
  // ctx.fillRect(obstacleX, bottomPillarStart, obstacleWidth, obstacleHeight);
  ctx.drawImage(obstacle, obstacleX, bottomPillarStart, obstacleWidth+20, obstacleHeight);
  if (obstacleX < -70) {
    obstacleOffset = (Math.random() * canvas.height * 1.25)
    obstacleX = canvas.width;
  }
  ctx.fill();
  ctx.closePath();

  let xCollision = false;
  let yCollision = false;

  if (obstacleX + obstacleWidth > playerX && obstacleX < playerX + 31.25) {
    // console.log("danger zone");
    xCollision = true;
    if (playerY < topPillarEnd || (playerY + 31.25 > bottomPillarStart && playerY < bottomPillarEnd)) {
      // if (playerY + 31.25 > bottomPillarStart && playerY < bottomPillarEnd) console.log("yanger zone");
      yCollision = true;
    }
  }

  if (xCollision && yCollision) {
    clearInterval(renderLoop);
    ctx.drawImage(dead, playerX, playerY, 50, 31.25);
    gameOverFn();
    gameOver = true;
  }
  xCollision = false;
  yCollision = false;
}

function gameOverFn() {
  ctx.font = "58px Comic Sans"
  ctx.fillStyle = 'red';
  ctx.fillText("GAME OVER", 70, 150);
  ctx.font = "28px Comic Sans"
  ctx.fillText("Press Space to Try Again", 95, 180);
}

function keyDownHandler(e) {
  if (e.keyCode === 32) {
    if (!gameStarted) gameStarted = true;
    if (gameOver) {
      setTimeout (() => location.reload(true), 1000);
    }
    e.preventDefault();
    if (canAccelerate && velocityY > minVelocity) velocityY += acceleration;
  }
}

function drawPoints() {
  ctx.font = "18px Comic Sans"
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${Math.round(points)}`, 380, 20);
}

function checkGameOver() {
  if (playerY > canvas.height + 31.25) {
    ctx.drawImage(dead, playerX, playerY, 50, 31.25);
    clearInterval(renderLoop);
    gameOverFn();
    gameOver = true;
    gameStarted = false;
    // setupGame();
    draw();
  }
}

function draw() {
  if (!gameStarted) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawPoints();
  drawObstacles();
  checkGameOver();
  points += 0.02;
}

let gameStarted = false;

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawPlayer();
  ctx.font = "36px Comic Sans"
  ctx.fillStyle = 'red';
  ctx.fillText("Welcome to Helicopter+", 70, 150);
  ctx.font = "32px Comic Sans";
  ctx.fillText("Press space to accelerate", 85, 210);
}

startGame();

document.addEventListener("keydown", keyDownHandler, false);
