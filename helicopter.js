let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Load Assets
const helicopter = new Image();
helicopter.src = 'https://i.imgur.com/tuHHozj.gif';
const background = new Image();
background.src = 'https://i.imgur.com/SwVtOrz.jpg';
const obstacle = new Image();
obstacle.src = 'https://i.imgur.com/kDp3Vxp.png';
const topObstacle = new Image();
topObstacle.src = 'https://i.imgur.com/Ai9epP2.png?1';
const bee = new Image();
bee.src = 'https://i.imgur.com/5H7neWd.png';
const projectile = new Image();
projectile.src = 'https://i.imgur.com/5nb5yVw.png?1';
const dead = new Image();
dead.src = 'https://i.imgur.com/qzTNUVS.png';
const shield = new Image();
shield.src = 'https://i.imgur.com/M7g9Xgt.png';
const money = new Image();
// money.src = 'https://i.imgur.com/jmN9or2.jpg';
money.src = 'https://www.wpclipart.com/money/bills/bills_2/100_dollar_bill_vector.png';

const rocket = new Image();
rocket.src = 'https://i.imgur.com/uoOPKi4.png';

// Game Setup

let gameStarted = false;

const playerStartX = 50;
const playerStartY = 50;
let scrollSpeed = 1.8;
const gravity = 200;
const acceleration = -2.2;
const maxVelocity = 3;
const minVelocity = -1.5;

let playerX = playerStartX;
let playerY = playerStartY;
let velocityY = 1;
let canAccelerate = true;

// Obstacle
let obstacleX = canvas.width;
let obstacleWidth = 50;
let obstacleOffset = (Math.random() * canvas.height * 1.25);
let obstacleHeight = canvas.height * 0.675;

// Bee
const BEE_START = 100;
const BEE_END = canvas.height - 50;
const BEE_X = 250;
let beeY = BEE_START;
let beeDy = 1.5;
let beeCooldown = false;

let beeDying = false;
let beeDead = true;

// Bee Projectile
const PROJECTILE_START = 245;
let projectileX = -110;
let projectileY = beeY;

// Powerups
const POWERUP_START = -100;
let powerUpX = POWERUP_START;
let powerUpY = 200;

// Rocket
let rocketX = -100;
let rocketY = -100;

// POWER UPS:
// 0 - shield
// 1 - money
let currentItem = 0;

let playerHasShield = false;
let playerInvulnerable = false;
let powerupCooldown = false;

let numRockets = 0;
let showRocket = false;

let points = 0;
let gameOver = false;
let speedFlag = false;

let renderLoop = setInterval(draw, 10);

function resetGame() {
  gameStarted = false;
  scrollSpeed = 1.8;
  playerX = playerStartX;
  playerY = playerStartY;
  velocityY = 1;
  canAccelerate = true;
  // Obstacle
  obstacleX = canvas.width;
  obstacleWidth = 50;
  obstacleOffset = (Math.random() * canvas.height * 1.25);
  obstacleHeight = canvas.height * 0.675;
  // Bee
  beeY = BEE_START;
  beeDy = 1.5;
  beeCooldown = false;
  beeDying = false;
  beeDead = true;
  // Bee Projectile
  projectileX = -110;
  projectileY = beeY;
  // Powerups
  powerUpX = POWERUP_START;
  powerUpY = 200;
  // Rocket
  rocketX = -100;
  rocketY = -100;
  // POWER UPS:
  // 0 - shield
  // 1 - money
  currentItem = 0;
  playerHasShield = false;
  playerInvulnerable = false;
  powerupCooldown = false;
  numRockets = 0;
  showRocket = false;
  points = 0;
  gameOver = false;
  speedFlag = false;
  let renderLoop = setInterval(draw, 10);
  // console.log("hey");
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
  let topPillarStart = -obstacleOffset;
  let topPillarEnd = topPillarStart + obstacleHeight;
  let bottomPillarStart = canvas.height - obstacleOffset + 50;
  let bottomPillarEnd = canvas.height - obstacleOffset + 50 + obstacleHeight;


  ctx.drawImage(topObstacle, obstacleX, topPillarStart, obstacleWidth+20, obstacleHeight)
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
    gameOverFn();
  }
  xCollision = false;
  yCollision = false;
}

function drawBee() {
  if (beeDead) {
    beeDying = false;
    return;
  }
  if (beeDying) {
    ctx.drawImage(dead, BEE_X, beeY, 50, 50);
    return;
  }
  beeY += beeDy;
  if (beeY < 0 || beeY > BEE_END) {
    beeDy *= -1;
  }
  if (!beeCooldown && Math.round(beeY) > Math.round(playerY) -6 && Math.round(beeY) < Math.round(playerY) + 6) {
    beeCooldown = true;
    setTimeout(() => beeCooldown = false, 2000);
    shootProjectile();
  }
  ctx.drawImage(bee, BEE_X, beeY, 50, 50);
}

function drawProjectile() {
  if (projectileX > -100) projectileX -= scrollSpeed*1.4;
  ctx.drawImage(projectile, projectileX, projectileY, 55, 20);

  // Check for Collision
  if (projectileX < (playerX + 50) && (projectileX + 50) > playerX) {
    // X Collision
    if (projectileY > playerY && projectileY < playerY + 20) {
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
    setTimeout(() => playerInvulnerable = false, 1000);
  }
  if (playerInvulnerable) return;
  ctx.font = "58px Comic Sans"
  ctx.fillStyle = 'red';
  ctx.fillText("GAME   OVER", 105, 150);
  ctx.font = "28px Comic Sans"
  ctx.fillText("Press Space to Try Again", 145, 190);
  ctx.drawImage(dead, playerX, playerY, 50, 31.25);
  clearInterval(renderLoop);
  gameOver = true;
  gameStarted = false;
  document.getElementById('explosion').play();
}

function keyDownHandler(e) {
  if (e.keyCode === 32) {
    if (!gameStarted) {
      gameStarted = true;
      setTimeout(() => beeDead = false, 20000);
    }
    if (gameOver) {
      setTimeout (() => location.reload(true), 1000);
    }
    e.preventDefault();
    if (canAccelerate && velocityY > minVelocity) velocityY += acceleration;
  }
  if (e.keyCode === 70) {
    if (numRockets > 0) {
      rocketX = playerX + 12;
      rocketY = playerY + 31.25;
      showRocket = true;
      numRockets--;
      document.getElementById('shoot').play();
    } else {
      document.getElementById('error').play();
    }
  }
}

function drawPoints() {
  ctx.font = "18px Comic Sans";
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${Math.round(points)}`, 470, 20);
  // draw number of rockets

  ctx.fillText(`Rockets: ${numRockets}`, 380, 20);

  if (Math.round(points) % 50 === 0 && Math.round(points) !== 0) {
    if (!speedFlag) {
      console.log("speed up");
      scrollSpeed += 0.1;
      speedFlag = false;
    }
    speedFlag = true;
  } else {
    speedFlag = false;
  }

}

function checkGameOver() {
  if (playerY > canvas.height - 10) {
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
  if (showRocket) shootRocket();
  if (!beeDead && !beeDying) drawProjectile();
  drawBee();

  if (!powerupCooldown) {
    powerupCooldown = true;
    setTimeout(() => spawnPowerUp(), 17000)
  }
  drawPowerUp();
  points += 0.02;
  checkGameOver();
}

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawPlayer();
  ctx.font = "38px Comic Sans"
  ctx.fillStyle = 'black';
  ctx.fillText("Welcome to Helicopter+", 110, 150);
  ctx.font = "34px Comic Sans";
  ctx.fillText("Press space to start", 165, 210);
}

function spawnPowerUp() {
  powerUpX = canvas.width+100;
  powerupCooldown = false;
  currentItem = Math.trunc(Math.random() * 3);
}

function drawPowerUp() {
  powerUpX -= scrollSpeed;
  if (currentItem === 0) drawShield();
  if (currentItem === 1) drawMoney();
  if (currentItem === 2) drawRockets();
}

function drawShield() {
  ctx.drawImage(shield, powerUpX, powerUpY, 50, 50);
  // Check for collision with player
  if (powerUpX < (playerX + 50) && (powerUpX + 50) > playerX) {
    // X Collision
    if (powerUpY < (playerY + 31.25) && (powerUpY > (playerY - 31.25))) {
      // Y Collision
      playerHasShield = true;
      powerUpX = -200;
      document.getElementById('shield').play();
    }
  }
}

function drawMoney() {
  ctx.drawImage(money, powerUpX, powerUpY, 60, 34);
  // Check for collision with player
  if (powerUpX < (playerX + 50) && (powerUpX + 50) > playerX) {
    // X Collision
    if (powerUpY < (playerY + 31.25) && (powerUpY > (playerY - 31.25))) {
      // Y Collision
      points += 25;
      powerUpX = -200;
      document.getElementById('cashmoney').play();
    }
  }
}

function drawRockets() {
  // console.log("hey");
  ctx.drawImage(rocket, powerUpX, powerUpY, 50, 50);
  // Check for collision with player
  if (powerUpX < (playerX + 50) && (powerUpX + 50) > playerX) {
    // X Collision
    if (powerUpY < (playerY + 31.25) && (powerUpY > (playerY - 31.25))) {
      // console.log("yCollision");
      numRockets = 2;
      powerUpX = -200;
      document.getElementById('reload').play();
    }
  }
}

function shootRocket() {
  rocketX += 5.5;
  ctx.drawImage(rocket, rocketX, rocketY, 25, 25);

  // Check for collision with bee
  if (!(beeDying || beeDead) && rocketX < (BEE_X + 50) && (rocketX + 20) > BEE_X) {
    if (rocketY < (beeY + 50) && (rocketY > (beeY - 10))) {
      points += 50;
      beeDying = true;
      setTimeout(() => beeDead = true, 500);
      setTimeout(() => beeDead = false, 20000);
      document.getElementById('explosion').play();
    }
  }
}

startGame();

document.addEventListener("keydown", keyDownHandler, false);
