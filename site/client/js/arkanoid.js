var canvas = document.getElementById("myCanvas");  
var ctx = canvas.getContext("2d"); 

var x = canvas.width / 2; 
var y = canvas.height - 30; 
var ballRadius = 10; 
var dx = 2; 
var dy = -2; 

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickColor = ["blue", "red", "yellow"];

var paddleWidth = 75;
var paddleHeight = 10;
var paddleSpeed = 7;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight; 
var paddleColor = ["black","brown"];
var paddleColorNumber = 0;

var rightPressed = false;
var leftPressed = false;

var score = 0;
var lives = 3;

var bricks = [];
for (var r = 0; r < brickRowCount; r++) {
  bricks[r] = [];
  for (var c = 0; c < brickColumnCount; c++) {
      bricks[r][c] = {x: 0, y: 0, status: 1, color: ""};
      bricks[r][c].x = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
      bricks[r][c].y = (r * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[r][c].color = brickColor[Math.round(Math.random() * (brickColor.length -1))];
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "grey";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.fillText("Lives: " + lives, canvas.width - 70, 20);
}

function drawHighScore() {
  if (document.cookie) {
    ctx.fillText("Best: " + document.cookie, 90, 20);
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor[paddleColorNumber];
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var r = 0; r < brickRowCount; r++) {
      for (var c = 0; c < brickColumnCount; c++) {
          if (bricks[r][c].status == 1) {
              ctx.beginPath();
              ctx.rect(bricks[r][c].x, bricks[r][c].y, brickWidth, brickHeight);
              ctx.fillStyle = bricks[r][c].color;
              ctx.fill();
              ctx.closePath();
          }
      }
  }
}

function collisionDetection() {
  for (var r = 0; r < brickRowCount; r++) {
      for (var c = 0; c < brickColumnCount; c++) {
          if (bricks[r][c].status == 1) {
              if (x > bricks[r][c].x && x < bricks[r][c].x + brickWidth && y > bricks[r][c].y && y < bricks[r][c].y + brickHeight) {
                  dy = -dy;
                  bricks[r][c].status = 0;
                  score++;
                  if (score == brickRowCount * brickColumnCount) {
                      if (document.cookie) {
                          if (document.cookie < score) {
                              document.cookie = score;
                          }
                      }
                      else {
                          document.cookie = score;
                      }
                      alert("YOU WIN Best score: " + document.cookie);
                      document.location.reload();
                  }
              }   
          }
      }
  }

}

function draw () { 
  if (y > canvas.height) {
      lives--;
      if(lives == 0) {
          if (document.cookie) {
            if (document.cookie < score) {
                document.cookie = score;
                }
            }
            else {
                document.cookie = score;
            }
          alert("GAME OVER Best score: " + document.cookie);
          document.location.reload();
          y = 0;
      }
      else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 2;
          dy = -2;
      }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  if (x + dx + ballRadius > canvas.width || x + dx < ballRadius) { 
      dx = -dx; 
  }
  if (y + dy < ballRadius) { 
      dy = -dy; 
  }
  else if (y + dy + ballRadius > paddleY) {
      if (x > paddleX && x < paddleX + paddleWidth){
          dy = -dy;
          if (paddleColorNumber == 0) {
              paddleColorNumber = 1;
          }
          else {
              paddleColorNumber = 0;
          }
      }
  }
  drawScore();
  drawHighScore();
  drawLives();
  drawPaddle();
  collisionDetection();
  drawBricks();
  ctx.beginPath(); 
  ctx.arc(x, y, ballRadius, 0, Math.PI*2,false); 
  ctx.fillStyle = "green"; 
  ctx.fill(); 
  ctx.closePath(); 
  x += dx; 
  y += dy; 
}


document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > paddleWidth / 2 && relativeX < canvas.width - (paddleWidth / 2)) {
      paddleX = relativeX - (paddleWidth / 2);
  }
}

setInterval(draw, 10); 
