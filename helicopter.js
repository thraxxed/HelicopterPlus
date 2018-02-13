let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Load Assets

const renderLoop = setInterval(draw, 10);
const helicopter = new Image();
helicopter.src = 'https://i.imgur.com/tuHHozj.gif';
const background = new Image();
background.src = 'https://t0.rbxcdn.com/d7ca67278858823d19c95902aa84494c';
const obstacle = new Image();
obstacle.src = 'https://donaldcarling.files.wordpress.com/2016/03/blast-harrier-laser-1.png?w=500';

// Initial Variable Declarations

const playerStartX = 50;
const playerStartY = 50;
const scrollSpeed = 1.8;
const gravity = 3;
const acceleration = -2;
const maxVelocity = 1.5;
const minVelocity = -.8;

let playerX = playerStartX;
let playerY = playerStartY;
let velocityY = 1;
let canAccelerate = true;
let points = 0;
let obstacleX = canvas.width;
let obstacleWidth = 70;
let obstacleOffset = (Math.random() * canvas.height * 1.25)
let obstacleHeight = canvas.height * 0.625;
let gameOver = false;



function setupGame() {
  playerX = playerStartX;
  playerY = playerStartY;
  velocityY = 1;
  canAccelerate = true;
  points = 0;
  obstacleX = canvas.width;
  obstacleWidth = 70;
  obstacleOffset = (Math.random() * canvas.height * 1.25)
  obstacleHeight = canvas.height * 0.625;
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
  // console.log(velocityY);
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

  ctx.fillRect(obstacleX, topPillarStart, obstacleWidth, obstacleHeight);
  // ctx.drawImage(obstacle, obstacleX, topPillarStart, obstacleWidth, obstacleHeight)
  ctx.fillRect(obstacleX, bottomPillarStart, obstacleWidth, obstacleHeight);
  // ctx.drawImage(obstacle, obstacleX, bottomPillarStart, obstacleWidth, obstacleHeight);
  if (obstacleX < -70) {
    obstacleOffset = (Math.random() * canvas.height * 1.25)
    obstacleX = canvas.width;
  }
  ctx.fill();
  ctx.closePath();

  let xCollision = false;
  let yCollision = false;

  if (obstacleX + obstacleWidth > playerX && obstacleX < playerX + 31.25) {
    console.log("danger zone");
    xCollision = true;
    if (playerY < topPillarEnd || (playerY + 31.25 > bottomPillarStart && playerY < bottomPillarEnd)) {
      if (playerY + 31.25 > bottomPillarStart && playerY < bottomPillarEnd) console.log("yanger zone");
      yCollision = true;
    }
  }

  if (xCollision && yCollision) {
    clearInterval(renderLoop);
    ctx.fillText("GAME OVER", 220, 150);
    gameOver = true;
  }
  xCollision = false;
  yCollision = false;
}

function keyDownHandler(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
    if (canAccelerate && velocityY > minVelocity) velocityY += acceleration;
  }
}

function drawPoints() {
  ctx.fillText(`Score: ${Math.round(points)}`, 410, 20);
}

function checkGameOver() {
  if (playerY > canvas.height + 31.25) {
    clearInterval(renderLoop);
    ctx.fillText("GAME OVER", 220, 150);
    gameOver = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawPoints();
  drawObstacles();
  checkGameOver();
  points += 0.02;
}

document.addEventListener("keydown", keyDownHandler, false);
