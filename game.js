let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

const scrollSpeed = 1.5;

let trackOneStartPos = 100;
let trackTwoStartPos = 660;
let trackThreeStartPos = 1700;

let trackOnePartTwoStartPos = 450;

const trackOneWidth = 350;

const cartX = 120;
let cartY = 180;

let cartDy = 0;

let midair = false;

let trackHeight = 180;

let pitfallOneTrigger = false;
let trackTwoTrigger = false;

let rampOnei = 0;

function drawTrackOne() {
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.rect(trackOneStartPos -= scrollSpeed, 200, trackOneWidth, 10);
  if (trackOneStartPos + trackOneWidth < 120 && !pitfallOneTrigger) {
    pitfallOneTrigger = true;
    midair = true;
    trackHeight = 600;
  }
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle="#FF0000";
  ctx.beginPath();
  ctx.moveTo(trackOneStartPos+40 + trackOneWidth, 205);
  ctx.lineWidth = 10;
  ctx.lineTo(trackOneStartPos+40 + trackOneWidth + 130, 250);
  if (trackOneStartPos + 40 + trackOneWidth < 120 && trackOneStartPos + 40 + trackOneWidth + 130 > 120) {
    // console.log("danger zone");
    if (!midair) {
      cartY += (rampOnei * 0.5882352941);
    }
    trackHeight = 185 + (rampOnei * 0.5882352941);
    rampOnei++;
    // console.log(trackHeight);
  }
  ctx.stroke();
  ctx.fillStyle = "#000000";
}





function drawTracks() {
  // console.log(trackHeight);
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  drawTrackOne();
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
    // debugger
    console.log(cartY);
    console.log(trackHeight);
    // console.log("hey");
    midair = false;
    cartY = trackHeight;
  }

  ctx.rect(cartX, cartY, 30, 20);
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCart();
  drawTracks();

  if (cartY > canvas.height) {
    clearInterval(renderLoop);
    ctx.fillText("GAME OVER", 220, 150)
  }
}

function jump() {
 if (!midair) {
   midair = true;
   cartY -= 1;
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
