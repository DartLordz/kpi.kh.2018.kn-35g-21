var start = new Date('November 1, 2018'); // Дата создания сайта
var end = new Date();
var life = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
document.getElementById("life_site").innerHTML = life;