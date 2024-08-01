let gameBoard = [];
let currentPlayer = "X";
let gameOver = false;
let xScore = 0;
let oScore = 0;

for (let i = 0; i < 9; i++) {
    gameBoard.push("");
    document.getElementById(`cell-${i}`).addEventListener("click", handleCellClick);
}

function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.split("-")[1];
    if (gameBoard[cellIndex] === "") {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkForWin();
        currentPlayer = currentPlayer === "X"? "O" : "X";
    }
}

function checkForWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[0]]!== "") {
            gameOver = true;
            if (gameBoard[condition[0]] === "X") {
                xScore++;
                document.getElementById("x-score").style.fontSize = "24px";
                document.getElementById("x-score").textContent = `X: ${xScore}`;
                document.getElementById("game-status").textContent = "X wins!";
            } else {
                oScore++;
                document.getElementById("o-score").style.fontSize = "24px";
                document.getElementById("o-score").textContent = `O: ${oScore}`;
                document.getElementById("game-status").textContent = "O wins!";
            }
            return;
        }
    }
    if (!gameBoard.includes("")) {
        gameOver = true;
        document.getElementById("game-status").textContent = "It's a draw!";
    }
}

document.getElementById("reset-button").addEventListener("click", resetGame);

function resetGame() {
    gameBoard = [];
    currentPlayer = "X";
    gameOver = false;
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).textContent = "";
        gameBoard.push("");
    }
    document.getElementById("game-status").textContent = "Game in progress...";
}