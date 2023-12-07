

const titre = document.querySelector(".titre")


const BLOCK_SIZE = 30;
const score = document.querySelector("#score")
score.innerHTML=45


var canvas = document.querySelector("#tetris");
var ctx = canvas.getContext("2d");


ctx.fillStyle = "green";
ctx.fillRect(x, y, largeur, hauteur);