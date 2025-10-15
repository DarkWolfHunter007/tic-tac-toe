const board = document.getElementById("board");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const modeSelect = document.getElementById("modeSelect");
const game = document.getElementById("game");

let cells = Array.from(document.querySelectorAll(".cell"));
let currentPlayer = "X";
let boardState = Array(9).fill("");
let aiEnabled = false;
let gameActive = true;

document.getElementById("friendMode").addEventListener("click", () => {
  aiEnabled = false;
  startGame();
});

document.getElementById("aiMode").addEventListener("click", () => {
  aiEnabled = true;
  startGame();
});

function startGame() {
  modeSelect.style.display = "none";
  game.style.display = "block";
  resetGame();
}

function handleClick(e) {
  const index = e.target.dataset.i;
  if (!gameActive || boardState[index] !== "") return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.disabled = true;

  if (checkWin()) {
    statusDiv.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== "")) {
    statusDiv.textContent = "It's a draw! 😅";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `Turn: ${currentPlayer}`;

  if (aiEnabled && currentPlayer === "O" && gameActive) {
    setTimeout(aiMove, 500); // little delay for realism
  }
}

function aiMove() {
  let emptyIndices = boardState.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  if (emptyIndices.length === 0) return;
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const cell = cells[randomIndex];
  cell.click();
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(([a,b,c]) =>
    boardState[a] &&
    boardState[a] === boardState[b] &&
    boardState[a] === boardState[c]
  );
}

function resetGame() {
  boardState.fill("");
  gameActive = true;
  currentPlayer = "X";
  cells.forEach(c => {
    c.textContent = "";
    c.disabled = false;
  });
  statusDiv.textContent = "Turn: X";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);