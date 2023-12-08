<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    let canvas;
    let score = 404;
    let ligne = 0;

    let victoire = false;

    onMount(() => {
        const context = canvas.getContext("2d");

        const ROWS = 10;
        const COLUMNS = 10;

        const BLOCK_SIZE = 15;

        const board = Array.from({ length: ROWS }, () =>
            Array(COLUMNS).fill(0),
        );

        let currentPiece = {
            shape: [],
            color: "",
            row: 0,
            col: 0,
        };

        function drawSquare(x, y, color) {
            context.fillStyle = color;
            context.fillRect(
                x * BLOCK_SIZE,
                y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE,
            );
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
                        drawSquare(
                            currentPiece.col + j,
                            currentPiece.row + i,
                            currentPiece.color,
                        );
                    }
                });
            });
        }

        function add(tag, text, container, class_name = "") {
            let elem = document.createElement(tag);
            elem.appendChild(document.createTextNode(text));
            elem.className = class_name;
            container.appendChild(elem);
            return elem;
        }

        function isValidMove() {
            for (let i = 0; i < currentPiece.shape.length; i++) {
                for (let j = 0; j < currentPiece.shape[i].length; j++) {
                    if (
                        currentPiece.shape[i][j] !== 0 &&
                        (board[currentPiece.row + i] === undefined ||
                            board[currentPiece.row + i][
                                currentPiece.col + j
                            ] === undefined ||
                            board[currentPiece.row + i][
                                currentPiece.col + j
                            ] !== 0)
                    ) {
                        if (
                            currentPiece.col != -1 &&
                            currentPiece.col + currentPiece.shape[0].length !=
                                11
                        ) {
                            if (score > 0) {
                                score = score - 8;
                            } else {
                                score = score + 8;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        function mergePiece() {
            for (let i = 0; i < currentPiece.shape.length; i++) {
                for (let j = 0; j < currentPiece.shape[i].length; j++) {
                    if (currentPiece.shape[i][j] !== 0) {
                        board[currentPiece.row + i][currentPiece.col + j] =
                            currentPiece.color;
                    }
                }
            }
        }

        function clearLines() {
            for (let row = ROWS - 1; row >= 0; row--) {
                if (board[row].every((block) => block !== 0)) {
                    // Supprimer la ligne
                    board.splice(row, 1);
                    if (score > 0) {
                        score = score - 100;
                    } else {
                        score = score + 100;
                    }

                    // Ajouter une nouvelle ligne vide en haut
                    board.unshift(Array(COLUMNS).fill(0));
                    ligne = ligne + 1;
                }
            }
        }
        function rotate() {
            const tempPiece = currentPiece.shape;
            currentPiece.shape = currentPiece.shape[0]
                .map((_, i) => currentPiece.shape.map((row) => row[i]))
                .reverse();

            if (!isValidMove()) {
                // Annuler la rotation si la nouvelle position n'est pas valide
                currentPiece.shape = tempPiece;
            }
        }

        function spawnPiece(anim) {
            const pieces = [
                { shape: [[1, 1, 1, 1]], color: "cyan" },
                {
                    shape: [
                        [1, 1, 1],
                        [1, 0, 0],
                    ],
                    color: "blue",
                },
                {
                    shape: [
                        [1, 1, 1],
                        [0, 0, 1],
                    ],
                    color: "orange",
                },
                {
                    shape: [
                        [1, 1, 1],
                        [0, 1, 0],
                    ],
                    color: "yellow",
                },
                {
                    shape: [
                        [1, 1],
                        [1, 1],
                    ],
                    color: "red",
                },
                {
                    shape: [
                        [1, 1, 0],
                        [0, 1, 1],
                    ],
                    color: "green",
                },
                {
                    shape: [
                        [0, 1, 1],
                        [1, 1, 0],
                    ],
                    color: "purple",
                },
            ];

            const randomPiece =
                pieces[Math.floor(Math.random() * pieces.length)];
            currentPiece = {
                shape: randomPiece.shape,
                color: randomPiece.color,
                row: 0,
                col:
                    Math.floor(COLUMNS / 2) -
                    Math.floor(randomPiece.shape[0].length / 2),
            };
            if (score == 0) {
                victoire = true;
                canvas.remove();
            } else if (!isValidMove() && score != 0) {
                // Fin de jeu (collision au début)
                score = parseInt(score) + 16;
                alert(
                    "Score : " +
                        score +
                        ", erreur 404, le jeu n'est pas finis...recommence!",
                );
            }
        }

        function moveDown(anim) {
            currentPiece.row++;
            const pieces = [
                { shape: [[1, 1, 1, 1]], color: "cyan" },
                {
                    shape: [
                        [1, 1, 1],
                        [1, 0, 0],
                    ],
                    color: "blue",
                },
                {
                    shape: [
                        [1, 1, 1],
                        [0, 0, 1],
                    ],
                    color: "orange",
                },
                {
                    shape: [
                        [1, 1, 1],
                        [0, 1, 0],
                    ],
                    color: "yellow",
                },
                {
                    shape: [
                        [1, 1],
                        [1, 1],
                    ],
                    color: "red",
                },
                {
                    shape: [
                        [1, 1, 0],
                        [0, 1, 1],
                    ],
                    color: "green",
                },
                {
                    shape: [
                        [0, 1, 1],
                        [1, 1, 0],
                    ],
                    color: "purple",
                },
            ];

            if (currentPiece.row == ROWS / 2) {
                const tempPiece = currentPiece;
                const randomPiece =
                    pieces[Math.floor(Math.random() * pieces.length)];
                currentPiece = {
                    shape: randomPiece.shape,
                    color: randomPiece.color,
                    row: tempPiece.row,
                    col: tempPiece.col,
                };
                if (currentPiece.col + currentPiece.shape[0].length == 11) {
                    currentPiece.col = currentPiece.col - 1;
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

        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowDown":
                    moveDown();
                    break;
                case "ArrowLeft":
                    moveRight();
                    break;
                case "ArrowRight":
                    moveLeft();
                    break;
                case "ArrowUp":
                    rotate();
                    break;
            }
        });

        function draw() {
            if (canvas != null) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                drawBoard();
                drawPiece();
            }
        }

        spawnPiece(); // Démarrer le jeu en générant la première pièce
        setInterval(moveDown, 1000); // Déplacer automatiquement vers le bas toutes les secondes

        // Boucle de jeu
        function gameLoop() {
            console.log("ICI");
            draw();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    });
</script>

<div id="fake-body">
    {#if victoire == false}
        <h1 class="titre">
            <span id="s1">404 </span><span id="s2">vous </span><span id="s3"
                >vous
            </span><span id="s4">êtes</span> <span id="s5">perdu</span>
        </h1>

        <span id="score">{score}</span><span id="ligne">{ligne}</span>
    {:else}
        <h1 class="victoire">
            <span id="s1">Félicitation, </span><span id="s2">vous </span><span
                id="s3"
                >avez perdu
            </span><span id="s4">votre</span> <span id="s5">temps</span>
        </h1>
        <a href="./"><button>Retour à l'accueil</button></a>
    {/if}
    <a href="./"><button>Abandon...</button></a>
    <canvas bind:this={canvas} id="tetris"> </canvas>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    :root {
        --forest-green-50: #f1fcf1;
        --forest-green-100: #dff9e1;
        --forest-green-200: #c0f2c5;
        --forest-green-300: #8fe699;
        --forest-green-400: #57d164;
        --forest-green-500: #30b73f;
        --forest-green-600: #22962f;
        --forest-green-700: #1e7728;
        --forest-green-800: #1d5e25;
        --forest-green-900: #194e20;
        --forest-green-950: #092a0f;
    }
    #fake-body {
        background-image: url("data:image/jpeg;base64,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pjan/CHPMYZaSS93jUXFx63sosWcwnaF9PSVlI1jS2rDA9xvmbwnFwy2Ntc3VAS3sxiccuOYtidKDJGxkcbcrScxkfCxzg0C5/2TzfsSVY0FIabENpMrzG5sL3NlFw6MSu4l2kaiwcDp2CjXA9qp6OmqKenJjdO5hdOxz2StERJDWuaRYHMb+9Zgbxpvbp611PC8VMQingcHGORoa1t+dwbNH1QEi0IkGPVJmnZmOFE+0RNe3S0dpMpcXFwAvzvoFDm00+epefbX1rQAG1MgkDniwNsshLmgEkWPa/VZ2DeLOK+XEHQwvMsJg4BDhE2LwgNABvyb1PUrX9oMUZUzcVlNFTDKBwoQQzS/isTzN/ogOgt38bZaDC2nR8ETp29yHNqYHj3DisK1rdlM9lBhIjc5gkxCQSBpLQ8cGXR9vMPCOfYLRcF3kVNKaUxxRn2enfTgHN42SOa8l1jzDmt5dl8tlN4M9DTinbBDMGSGWF0gJdDI5paXNsdRYnT1KA2bYrEZo/4eZHNIxsUE742te5rY353eNgBs12g1GqjvBpXOrYHucXOdOwucSS5xMgJJJ1JJ6q6wfaeWnFaA1rzWROikc69xxCS5zbG17lYmiqDFIyUaljg4A8iWkEA/JAS5tw8/xho2e3unaa6ImjJky05DoQPC45fEHHyjuvttfUvkpbyPc8sx+RjS4lxaxpfZjb+VotyGijHFdppZ8QOJWayXitlAbcta6PLl0J11aFk9qdvpqxjIxBDTtbMah3CB8dQ7nK4knXU6eut0Bvu8v8Uxr/58P7CJbZt8GyUWIyttmipeA/ubiCaP9q9QztXvCnroDA6CGLiPbJM+MEOmkY3K0uuTYWA09AvpiG8mpmbXNdFGG1rI2PaM1mcJuUOZrzIte/YICSMJqH+z0cGd3CdgkpdFc5HOGQAlnImxIv6rn9b0zeVO2jZSsp4GuZT+zCps4yiJw8QBzWBNuy0VAEREAREQBERAEREAREQBERAEREAREQBERAVRURAelS6oiArdVXlEBVFREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBfSG19f3HVfNEB98rO/7/v/ANFVzGgX+XPXurdEB9y1nQ/v6qoy6+88udtLWVuiAuYy0Otp7+evde5HtzjlYcz0VmiAugIze+nL/X6r1kj5369/dy7qzRAXFQW6Fvx+St0RAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH/2Q==");
    }

    h1 {
        margin-top: 1em;
        text-align: center;
    }
    h1 span {
        margin-left: 5em;
        font-size: 50px;
    }

    #s1 {
        color: red;
        -webkit-text-stroke: 0.9px rgb(250, 150, 150);
        text-shadow: 0px 1px 8px rgb(90, 255, 156);
        text-decoration: none;
    }
    #s2 {
        color: red;
        -webkit-text-stroke: 0.9px rgb(250, 100, 150);
        text-shadow: 0px 1px 8px rgb(90, 255, 156);
        text-decoration: none;
    }
    #s3 {
        color: red;
        -webkit-text-stroke: 0.9px rgb(250, 100, 100);
        text-shadow: 0px 1px 8px rgb(90, 255, 156);
        text-decoration: none;
    }
    #s4 {
        color: red;
        -webkit-text-stroke: 0.9px rgb(250, 50, 50);
        text-shadow: 0px 1px 8px rgb(90, 255, 156);
        text-decoration: none;
    }
    #s5 {
        color: red;
        -webkit-text-stroke: 0.9px rgb(250, 0, 0);
        text-shadow: 0px 1px 8px rgb(90, 255, 156);
        text-decoration: none;
    }
    canvas {
        margin-left: 10%;
        width: 80%;
        height: auto;
        border: 2px solid red;
    }
    button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        border: 2px solid #3498db;
        border-radius: 5px;
        color: #ffffff;
        background-color: #3498db;
        transition:
            background-color 0.3s,
            color 0.3s;
    }

    /* Effet de survol */
    button:hover {
        background-color: #ffffff;
        color: #3498db;
    }

    .victoire {
        margin-top: 10em;
    }
    #score {
        font-size: 200px;
        color: red;
        color: #fff;
        text-shadow:
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #fff,
            0 0 42px #0fa,
            0 0 82px #0fa,
            0 0 92px #0fa,
            0 0 102px #0fa,
            0 0 151px #0fa;
    }
    #ligne {
        margin-left: 5em;
        font-size: 50px;
        font-size: 200px;
        color: #fff;
        text-shadow:
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #fff,
            0 0 42px #0fa,
            0 0 82px #0fa,
            0 0 92px #0fa,
            0 0 102px #0fa,
            0 0 151px #0fa;
    }

    canvas {
        margin-left: 20em;
        margin-bottom: 1em;
    }
</style>
