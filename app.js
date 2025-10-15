const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let board = Array(9).fill(null);
let xTurn = true;
const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner(b) {
  for (const [a, c, d] of wins) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return b.every(v => v) ? 'draw' : null;
}

function updateStatus() {
  const res = checkWinner(board);
  if (res === 'draw') statusEl.textContent = 'Draw!';
  else if (res) statusEl.textContent = `Winner: ${res}`;
  else statusEl.textContent = `Turn: ${xTurn ? 'X' : 'O'}`;
}

function handleClick(e) {
  const i = +e.target.dataset.i;
  if (board[i] || checkWinner(board)) return;
  board[i] = xTurn ? 'X' : 'O';
  e.target.textContent = board[i];
  xTurn = !xTurn;
  updateStatus();
}

function reset() {
  board.fill(null);
  cells.forEach(c => c.textContent = '');
  xTurn = true;
  updateStatus();
}

cells.forEach(c => c.addEventListener('click', handleClick));
resetBtn.addEventListener('click', reset);
updateStatus();
