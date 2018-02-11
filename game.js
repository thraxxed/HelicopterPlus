let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");


const scrollSpeed = 2;
let trackOneStartPos = 100;
let trackTwoStartPos = 660;
let trackThreeStartPos = 1700;

let midair = false;

const cartX = 120;
let cartY = 180;

let cartDy = 0;

let trackHeight = 180;

let pitfallOneTrigger = false;

let trackTwoTrigger = false;

function drawTracks() {
  console.log(trackHeight);
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.rect(trackOneStartPos -= scrollSpeed, 200, canvas.width, 20);
  if (trackOneStartPos + 480 < 120 && !pitfallOneTrigger) {
    pitfallOneTrigger = true;
    midair = true;
    trackHeight = 600;
  }
  ctx.rect(trackTwoStartPos -= scrollSpeed, 200, canvas.width*3, 20)
  if (trackTwoStartPos < 145 && !trackTwoTrigger) {
    trackTwoTrigger = true;
    trackHeight = 180;
  }
  ctx.rect(trackThreeStartPos -= scrollSpeed, 200, canvas.width*3, 20)
  ctx.fill();
  ctx.closePath();
}

function drawCart() {
  if (midair) {
    cartDy += 0.5;
  }
  ctx.beginPath();
  ctx.fillStyle = "FF0000";
  cartY += cartDy;
  if (cartY > trackHeight) {
    midair = false;
    cartY = 180;
  }
  if (cartY > canvas.height) {
    clearInterval(renderLoop);
    ctx.fillText("GAME OVER", 220, 150)
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
 }
}

function keyDownHandler(e) {
  if (e.keyCode === 32) {
    jump();
  }
}

document.addEventListener("keydown", keyDownHandler, false)

const renderLoop = setInterval(draw, 10);
