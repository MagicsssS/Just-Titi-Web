

const titre = document.querySelector(".titre")

const BLOCK_SIZE = 10
const score = document.querySelector("#score")
score.innerHTML=45


function drawPiece(piece) {
    var canvas = document.querySelector("#tetris");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    for (let i = 0; i < piece.length; i++) {
        ctx.fillRect(piece[i][0], piece[i][1], BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeRect(piece[i][0], piece[i][1], BLOCK_SIZE, BLOCK_SIZE);
    }
}

let piece_T = [[10,10],[20,10],[20,0],[30,10]]
drawPiece(piece_T)

  