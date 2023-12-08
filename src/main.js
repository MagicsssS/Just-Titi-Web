const titre = document.querySelector(".titre")

const score = document.querySelector("#score")
const ligne = document.querySelector("#ligne")
score.innerHTML = 404
ligne.innerHTML = 0


const canvas = document.querySelector('#tetris');
const context = canvas.getContext('2d');

const ROWS = 10;
const COLUMNS = 10;

const BLOCK_SIZE = 15


const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));

// Vers le bas par défaut
var rotation = 0;

let currentPiece = {
  shape: [],
  color: '',
  row: 0,
  col: 0,
};

function drawSquare(x, y, color) {
  context.fillStyle = color;
  context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);

}
function drawBoard() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      if (board[row][col] !== 0) {
        drawSquare(col, row, board[row][col]);
      }
    }
  }
}


function drawPiece() {
  currentPiece.shape.forEach((row, i) => {
    row.forEach((value, j) => {
      if (value !== 0) {
        drawSquare(currentPiece.col + j, currentPiece.row + i, currentPiece.color);
      }
    });
  });
}

function add(tag, text, container, class_name = "") {
  let elem = document.createElement(tag);
  elem.appendChild(document.createTextNode(text))
  elem.className = class_name;
  container.appendChild(elem);
  return elem;
}


function isValidMove() {
  for (let i = 0; i < currentPiece.shape.length; i++) {
    for (let j = 0; j < currentPiece.shape[i].length; j++) {
      if (
        currentPiece.shape[i][j] !== 0 &&
        ((board[currentPiece.row + i] === undefined || board[currentPiece.row + i][currentPiece.col + j] === undefined) ||
          board[currentPiece.row + i][currentPiece.col + j] !== 0)
      ) {
        //collision
        if (currentPiece.col != -1 && ((currentPiece.col + currentPiece.shape[0].length != 11))) {
          if (score.innerHTML > 0) {
            score.innerHTML = parseInt(score.innerHTML) - 8
          } else {
            score.innerHTML = parseInt(score.innerHTML) + 8
          }
        }
        return false
      }
    }
  }
  return true;
}



function mergePiece() {
  for (let i = 0; i < currentPiece.shape.length; i++) {
    for (let j = 0; j < currentPiece.shape[i].length; j++) {
      if (currentPiece.shape[i][j] !== 0) {
        board[currentPiece.row + i][currentPiece.col + j] = currentPiece.color;
      }
    }
  }
}

function clearLines() {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row].every((block) => block !== 0)) {
      // Supprimer la ligne
      board.splice(row, 1);
      if (score.innerHTML > 0) {
        score.innerHTML = parseInt(score.innerHTML) - 100
      } else {
        score.innerHTML = parseInt(score.innerHTML) + 100
      }

      // Ajouter une nouvelle ligne vide en haut
      board.unshift(Array(COLUMNS).fill(0));
      ligne.innerHTML = parseInt(score.innerHTML) + 1
    }
  }
}
function rotate() {
  const tempPiece = currentPiece.shape;
  currentPiece.shape = currentPiece.shape[0].map((_, i) => currentPiece.shape.map((row) => row[i])).reverse();

  if (!isValidMove()) {
    // Annuler la rotation si la nouvelle position n'est pas valide
    currentPiece.shape = tempPiece;
  }
}

function spawnPiece(anim) {
  const pieces = [
    { shape: [[1, 1, 1, 1]], color: 'cyan' },
    { shape: [[1, 1, 1], [1, 0, 0]], color: 'blue' },
    { shape: [[1, 1, 1], [0, 0, 1]], color: 'orange' },
    { shape: [[1, 1, 1], [0, 1, 0]], color: 'yellow' },
    { shape: [[1, 1], [1, 1]], color: 'red' },
    { shape: [[1, 1, 0], [0, 1, 1]], color: 'green' },
    { shape: [[0, 1, 1], [1, 1, 0]], color: 'purple' },
  ];

  const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
  currentPiece = {
    shape: randomPiece.shape,
    color: randomPiece.color,
    row: 0,
    col: Math.floor(COLUMNS / 2) - Math.floor(randomPiece.shape[0].length / 2),
  };
  if (score.innerHTML == 0) {
    let titre = document.querySelector(".titre")
    titre.remove()
    new_titre = document.querySelector(".victoire").hidden = false
    let canva = document.querySelector("canvas")
    canva.remove()
    let span = document.querySelector("#score")
    span.remove()
    lien = document.querySelector("a").hidden = false


  } else if (!isValidMove() && score.innerHTML != 0) {
    // Fin de jeu (collision au début)
    score.innerHTML = parseInt(score.innerHTML) + 16
    alert('Score : ' + score.innerHTML + ", erreur 404, le jeu n'est pas finis...recommence!")
  }
}



function moveDown(anim) {
  currentPiece.row++
  const pieces = [
    { shape: [[1, 1, 1, 1]], color: 'cyan' },
    { shape: [[1, 1, 1], [1, 0, 0]], color: 'blue' },
    { shape: [[1, 1, 1], [0, 0, 1]], color: 'orange' },
    { shape: [[1, 1, 1], [0, 1, 0]], color: 'yellow' },
    { shape: [[1, 1], [1, 1]], color: 'red' },
    { shape: [[1, 1, 0], [0, 1, 1]], color: 'green' },
    { shape: [[0, 1, 1], [1, 1, 0]], color: 'purple' },
  ];

  if (currentPiece.row == ROWS / 2) {
    const tempPiece = currentPiece;
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)]
    currentPiece = {
      shape: randomPiece.shape,
      color: randomPiece.color,
      row: tempPiece.row,
      col: tempPiece.col,
    };
    if (currentPiece.col + currentPiece.shape[0].length == 11) {
      currentPiece.col = currentPiece.col - 1
    }
  }

  if (!isValidMove()) {
    currentPiece.row--; // Annuler le mouvement vers le bas
    mergePiece(); // Fusionner la pièce avec le tableau
    clearLines(); // Supprimer les lignes complètes
    spawnPiece(); // Générer une nouvelle pièce

    // Vérifier si la nouvelle pièce a atteint la fin du tableau (fin de jeu)
    if (!isValidMove()) {
      location.reload(); // Recharge la page
    }
  }
}

function moveLeft() {
  currentPiece.col--;
  if (!isValidMove()) {
    currentPiece.col++; // Annuler le mouvement à gauche
  }
}

function moveRight() {
  currentPiece.col++;
  if (!isValidMove()) {
    currentPiece.col--; // Annuler le mouvement à droite
  }
}


document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveRight();
      break;
    case 'ArrowRight':
      moveLeft();
      break;
    case 'ArrowUp':
      rotate();
      break;
  }
});

function draw() {
  let canva = document.querySelector("canvas")
  if (canva != null) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPiece();
  }

}

spawnPiece(); // Démarrer le jeu en générant la première pièce
setInterval(moveDown, 1000); // Déplacer automatiquement vers le bas toutes les secondes

// Boucle de jeu
function gameLoop() {
  console.log("ICI")
  draw();
  requestAnimationFrame(gameLoop);
}

// gameLoop();
