var canvas = document.getElementById("myCanvas");  
var ctx = canvas.getContext("2d"); 
var x = 7;
var y = 71;
var pointRadius = 6;
var mapActive = false;
var greenPoint = false;
var greenX = 0;
var greenY = 0;
var enemies = 0;
var losses = "";
var end = false;
var score = 0;

var cellWidth = 96;
var cellHeight = 64;

var cells = [];
for (var r = 0; r < 4; r++) {
      cells[r] = [];
      for (var c = 0; c < 5; c++) {
          cells[r][c] = {x: 0, y: 0, status: true, type: Math.floor(Math.random() * 4), pic: new Image()};
          cells[r][c].x = c * cellWidth ;
          cells[r][c].y = r * cellHeight + cellHeight;
      }
  }

var cellimg = ["./img/orcsgoblins/mountain.jpg", "./img/orcsgoblins/field.jpg", "./img/orcsgoblins/forest.jpg", "./img/orcsgoblins/desert.jpg"];

var warriors = 50;
var morality = 0;
var food = 500;
var gold = 100;

function map() {

    if (mapActive) {

        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Орки: " + warriors, 3, 32);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Мораль: " + morality, 123, 32);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Еда: " + food, 243, 32);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Золото: " + gold, 363, 32);
        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 5; c++) {
                cells[r][c].pic.onload = function() {
                    for (var r = 0; r < 4; r++) {
                        for (var c = 0; c < 5; c++) {
                              ctx.drawImage(cells[r][c].pic, cells[r][c].x, cells[r][c].y);
                        }
                    }
                }
                cells[r][c].pic.src = cellimg[cells[r][c].type];
            }
        }
    }
}

function points() {

    if (mapActive) {
        if (greenPoint) {
            ctx.beginPath(); 
            ctx.arc(greenX, greenY, pointRadius, 0, Math.PI*2,false); 
            ctx.fillStyle = "green"; 
            ctx.fill(); 
            ctx.closePath(); 
            if (x < greenX) {
                x += 1;
            }
            else {
                x -= 1;
            }
            if (y < greenY) {
                y += 1;
            }
            else {
                y -=1;
            }
        }
        ctx.beginPath(); 
        ctx.arc(x, y, pointRadius, 0, Math.PI*2,false); 
        ctx.fillStyle = "red"; 
        ctx.fill(); 
        ctx.closePath(); 

        for (var r = 0; r < 4; r++) {
            for (var c = 0; c < 5; c++) {
                if (x > cells[r][c].x && x < cells[r][c].x + cellWidth && y > cells[r][c].y && y < cells[r][c].y + cellHeight) {
                    if (cells[r][c].status) {
                        mapActive = false;
                        event(cells[r][c].type);
                        cells[r][c].status = false;
                    }
                }
                else {
                    cells[r][c].status = true;
                }
            }
        }
    }
}

function death(deathText) {
    if (food < 0) {
        warriors += food;
        food = 0;
    }
    if (warriors < 1) {
        end = true;

        if (document.cookie) {
            if ( score > document.cookie) {
                document.cookie = score;
            }
        }
        else {
            document.cookie = score;
        }

        dialog("./img/orcsgoblins/death.jpg", deathText + " Ваш счет:" + score + " Лучший счет: " + document.cookie);
    }
}

function event(climate){
    score += 1;
    var eventNumber = Math.floor(Math.random() * 7);
    var climateText = "Армия: -" + warriors + " еда.";
    food -= warriors;
    death("Мда, умер с голоду...");

    if (climate == 0) {
        food -= 10;
        death("Мда, умер с голоду...");
        climateText += " Горы: еда -" + 10;
    }
    else if (climate == 1) {
        warriors += 3;
        climateText += " Поля: орки +" + 3;
    }
    else if (climate == 2) {
        food += 10;
        climateText += " Леса: еда +" + 10;
    }
    else if (climate == 3) {
        warriors -= 3;
        climateText += " Пустыня: орки -" + 3;
        death("Мда, умер с голоду...");
    }

    if (eventNumber == 0) {
        food += 50;
        if (!end) {
            dialog("./img/orcsgoblins/orc.jpg","Мы нашли жратву: +50 еда. " + climateText);
        }
    }
    else if (eventNumber == 1) {
        gold += 50;
        if (!end) {
            dialog("./img/orcsgoblins/orc.jpg","Мы нашли бабло: +50 золото. " + climateText);
        }
    } 
    else if (eventNumber == 2) {
        warriors += 10;
        if (!end) {
            dialog("./img/orcsgoblins/orc.jpg","Мы нашли бомжей: +10 орков. " + climateText);
        }
    }
    else if (eventNumber == 3) {
        morality += 1;
        if (!end) {
            dialog("./img/orcsgoblins/orc.jpg","Мы нашли бухло: +1 мораль. " + climateText);
        }
    }
    else if (eventNumber == 4) {
        if (!end) {
            dialog("./img/orcsgoblins/merchant.jpg","Мы договорились: + " + gold + " еда -" + gold + " золото " + climateText);
        }
        food += gold;
        gold = 0;
    }
    else if (eventNumber == 5) {
        enemies = Math.floor(Math.random() * 100);
        if (enemies > warriors + morality) {
            gold -= enemies;
            if (gold < 0) {
                warriors += gold;
                death("Убили за неуплату налогов...");
                gold *= -1;
                losses = "- " + gold + " орки ";
                gold = 0;
            }
            if (!end) {
                dialog("./img/orcsgoblins/undead.jpg","Поражение: - " + enemies + " золото " + losses + climateText);
            }
        }
        else {
            gold += enemies * 3;
            morality += 1;
            if (!end) {
                dialog("./img/orcsgoblins/undead.jpg","Победа: + " + (enemies * 3) + " золото +1 мораль "  + climateText);
            }
        }
    }
    else if (eventNumber == 6) {
        enemies = Math.floor(Math.random() * 100);
        if (enemies > warriors + morality) {
            gold -= enemies;
            if (gold < 0) {
                warriors += gold;
                death("Убили за неуплату налогов...");
                gold *= -1;
                losses = "- " + gold + " орки ";
                gold = 0;
            }
            if (!end) {
                dialog("./img/orcsgoblins/knights.jpg","Поражение: - " + enemies + " золото " + losses + climateText);
            }
        }
        else {
            food += enemies * 3;
            morality += 1;
            if (!end) {
                dialog("./img/orcsgoblins/knights.jpg","Победа: + " + (enemies * 3) + " еда +1 мораль " + climateText);
            }
        }
    }
}
function dialog(imgname,text) {
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    }
    img.src = imgname;
    ctx.beginPath();
    ctx.rect(0, 192, 480, 128);
    ctx.fillStyle = "#663300";
    ctx.fill();
    ctx.closePath();
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(text, 3, 224);

    ctx.beginPath();
    ctx.rect(10, 252, 460, 56);
    ctx.fillStyle = "#805500";
    ctx.fill();
    ctx.closePath();
    ctx.font = "15px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Ok", canvas.width/2 - 4, 288);
}
document.addEventListener("click", handler,false);

dialog("./img/orcsgoblins/orc.jpg","Приветствую, босс. Мы должны отыскать наших братюнь - гоблинов");

setInterval(map, 200);
setInterval(points, 10);

function handler(e) {
    var relativeX = e.clientX - canvas.getBoundingClientRect().left;
    var relativeY = e.clientY - canvas.getBoundingClientRect().top;
    if (end) {
        document.location.reload();
    }
    if (!mapActive) {
        if (relativeX > 0 && relativeX < canvas.width && relativeY > 0 && relativeY < canvas.height) {
            mapActive = true;
        }
    }
     else {
        if (relativeX > pointRadius && relativeX < canvas.width - pointRadius && relativeY > cellHeight + pointRadius && relativeY < canvas.height - pointRadius) {
            greenPoint = true;
            greenX = relativeX;
            greenY = relativeY;
        }
    }
}