var canvas = document.getElementById("myCanvas");  
var ctx = canvas.getContext("2d"); 

var round = 1;
var show = true;
var clickEnable = false;

var highlightEnable = false;

var step = 0;

var x = 0;
var y = 0;

var columnCount = 3;
var rawCount = 2;
var blockWidth = 300;
var blockHeight = 280;
var offset = 10;
var scoreLine = 40;

var colors = ["#ffcc80","#99e699", "#8080ff", "#ffff80", "#80d4ff", "#ff80ff"]; 
var higlightColors = ["#ff9900", "#33cc33", "#0000ff", "#ffff00", "#00aaff", "#ff00ff"];

var highlightColumn = [];
var highlightRaw = [];

var blocks = [];
for (var r = 0; r < rawCount; r++) {
      blocks[r] = [];
      for (var c = 0; c < columnCount; c++) {
          blocks[r][c] = {x: 0, y: 0, color: colors[c + (r * columnCount)], highlight: higlightColors[c + (r * columnCount)]};
          blocks[r][c].x = c * (blockWidth + offset * 2) + offset ;
          blocks[r][c].y = r * (blockHeight + offset * 2) + scoreLine + offset;
      }
  }

function drawRect (c, r, color) {
    ctx.beginPath();
    ctx.rect(blocks[r][c].x, blocks[r][c].y, blockWidth, blockHeight);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawBlocks () {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Round: " + round, 20, 30);

    for (var r = 0; r < rawCount; r++) {
        for (var c = 0; c < columnCount; c++) {
            drawRect(c, r, blocks[r][c].color);
        }
    }
    if (!highlightEnable) {
        showBlocks();
    }
}

function showBlocks () {
    if (show) {
        highlightEnable = true;
        for (var i = 0; i < round; i++) {
            highlightColumn[i] = Math.floor(Math.random() * columnCount);
            highlightRaw[i] = Math.floor(Math.random() * rawCount);
            if ( i == 0) {
                setTimeout (drawRect, 1000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 2000);
            }
            else if ( i == 1) {
                setTimeout (drawRect, 3000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 4000);
            }
            else if ( i == 2) {
                setTimeout (drawRect, 5000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 6000);
            }
            else if ( i == 3) {
                setTimeout (drawRect, 7000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 8000);
            }
            else if ( i == 4) {
                setTimeout (drawRect, 9000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 10000);
            }
            else if ( i == 5) {
                setTimeout (drawRect, 11000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 12000);
            }
            else if ( i == 6) {
                setTimeout (drawRect, 13000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 14000);
            }
            else if ( i == 7) {
                setTimeout (drawRect, 15000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 16000);
            }
            else if ( i == 8) {
                setTimeout (drawRect, 17000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 18000);
            }
            else if ( i == 9) {
                setTimeout (drawRect, 19000, highlightColumn[i], highlightRaw[i], blocks[highlightRaw[i]][highlightColumn[i]].highlight);
                setTimeout (drawBlocks, 20000);
            }
        }
        show = false;
        if (round == 1) {
            setTimeout (function () {clickEnable = true;}, 2000)
        }
        else if (round == 2) {
            setTimeout (function () {clickEnable = true;}, 4000)
        }
        else if (round == 3) {
            setTimeout (function () {clickEnable = true;}, 6000)
        }
        else if (round == 4) {
            setTimeout (function () {clickEnable = true;}, 8000)
        }
        else if (round == 5) {
            setTimeout (function () {clickEnable = true;}, 10000)
        }
        else if (round == 6) {
            setTimeout (function () {clickEnable = true;}, 12000)
        }
        else if (round == 7) {
            setTimeout (function () {clickEnable = true;}, 14000)
        }
        else if (round == 8) {
            setTimeout (function () {clickEnable = true;}, 16000)
        }
        else if (round == 9) {
            setTimeout (function () {clickEnable = true;}, 18000)
        }
        else if (round == 10) {
            setTimeout (function () {clickEnable = true;}, 20000)
        }

        highlightEnable = false;
        step = 0;
    }
}

drawBlocks();

document.addEventListener("click", handler,false);

function handler(e) {
    x = e.clientX - canvas.getBoundingClientRect().left;
    y = e.clientY - canvas.getBoundingClientRect().top;
    if (clickEnable) {
        for (r = 0; r < rawCount; r++) {
            for (c = 0; c < columnCount; c++) {
                if (x > blocks[r][c].x && x < blocks[r][c].x + blockWidth && y > blocks[r][c].y && y < blocks[r][c].y + blockHeight) {
                    if (r == highlightRaw[step] && c == highlightColumn[step]){
                        drawRect(c, r, blocks[r][c].highlight);
                        setTimeout (drawBlocks, 200);
                        step += 1;
                        x = 0;
                        y = 0;
                        if (step == round) {
                            round += 1;
                            clickEnable = false;
                            show = true;
                            setTimeout (drawBlocks, 1000);
                        }
                        if (round == 11) {
                            alert("You win!");
                            document.location.reload();
                        }
                    }
                    else {
                        drawRect(c, r, "red");
                         setTimeout (function () {
                            alert("You lose! Round: " + round);
                            document.location.reload();
                         }, 1000);
                    }
                }
            }
        }
    } 
}