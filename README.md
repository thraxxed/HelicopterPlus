# Helicopter +
Helicopter Plus is a 2-dimensional sidescrolling game in which the player controls a helicopter, initially in
free-fall, which may only be moved vertically.

The player must avoid randomly positioned obstacles and enemies, and may collect items for bonus points, as well as power-ups.

![game](https://i.imgur.com/8dhXgpf.jpg)

## How to Play
* Press the Space Bar to activate positive upward acceleration
* Press F to fire a rocket (once ammo has been collected!)

## Features
* Manuever character with semi-realistic physics.
* Avoid enemies and obstacles
* Collect three types of items:
  - Bubble Shields: Invulnerable until hit once
  - $100 Bill: Awards 25 Points
  - Rockets: Gives 2 rockets which may be fired at enemies.  If they are hit, you receive points and the enemy retreats temporarily.
* Accumulate points by surviving longer, and view local high scores
* Difficulty of game scales the longer the player survives
* Appropriate sound effects and graphics

## Code Snippets
### Drawing Obstacles

```javascript
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
    xCollision = true;
    if (playerY < topPillarEnd || (playerY + 31.25 > bottomPillarStart && playerY < bottomPillarEnd)) {
      yCollision = true;
    }
  }

  if (xCollision && yCollision) {
    gameOverFn();
  }
  xCollision = false;
  yCollision = false;
}
```

### Power-ups

```javascript
function spawnPowerUp() {
  powerUpX = canvas.width+100;
  powerUpY = Math.random() * canvas.height;
  if (powerUpY > canvas.height - 50) powerUpY = canvas.height - 50;
  powerupCooldown = false;
  currentItem = Math.trunc(Math.random() * 3);
}

function drawPowerUp() {
  powerUpX -= scrollSpeed;
  if (currentItem === 0) drawShield();
  if (currentItem === 1) drawMoney();
  if (currentItem === 2) drawRockets();
}
```
