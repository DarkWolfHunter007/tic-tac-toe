// 🌸 Elements
const board = document.getElementById("board");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const modeSelect = document.getElementById("modeSelect");
const game = document.getElementById("game");
const cells = Array.from(document.querySelectorAll(".cell"));

// 🌟 Popup Elements
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupClose = document.getElementById("popup-close");

// 💖 Game State
let currentPlayer = "X";
let boardState = Array(9).fill("");
let aiEnabled = false;
let gameActive = false;

// 🎮 Mode Selection
document.getElementById("friendMode")?.addEventListener("click", () => {
  aiEnabled = false;
  startGame();
});

document.getElementById("aiMode")?.addEventListener("click", () => {
  aiEnabled = true;
  startGame();
});

function startGame() {
  if (modeSelect) modeSelect.style.display = "none";
  if (game) game.style.display = "block";
  resetGame();
}

// ✨ Handle Cell Clicks
function handleClick(e) {
  const index = e.target.dataset.i;
  if (!gameActive || boardState[index] !== "") return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.disabled = true;

  if (checkWin()) {
    showPopup(`${currentPlayer} wins! 🎉`);
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== "")) {
    showPopup("It's a draw! 🤝");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `Turn: ${currentPlayer}`;

  if (aiEnabled && currentPlayer === "O" && gameActive) {
    setTimeout(aiMove, 500); // small delay for realism
  }
}

// 🤖 AI Logic (random easy mode)
function aiMove() {
  const emptyIndices = boardState
    .map((v, i) => (v === "" ? i : null))
    .filter(v => v !== null);

  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const cell = cells[randomIndex];
  cell.click();
}

// 🏆 Win Checker
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

// 🔄 Reset Game
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

// 🌸 Popup Functions
function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
}

popupClose.addEventListener("click", () => {
  popup.classList.add("hidden");
  resetGame();
});

// 🧩 Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);