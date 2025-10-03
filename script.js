// script.js
const container = document.querySelector(".container");
const submitBtn = document.getElementById("submit");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = Array(9).fill(null);

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim() || "Player1";
  player2 = document.getElementById("player2").value.trim() || "Player2";
  currentPlayer = player1;

  // Replace form with game board (keep heading)
  container.innerHTML = `
    <h1>Tic Tac Toe</h1>
    <div class="message">${currentPlayer}, you're up</div>
    <div class="board">
      ${Array.from({ length: 9 }, (_, i) => `<div class="cell" id="${i + 1}"></div>`).join("")}
    </div>
  `;

  startGame();
});

function startGame() {
  const messageDiv = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      const index = parseInt(cell.id) - 1;
      if (!board[index]) {
        if (currentPlayer === player1) {
          cell.textContent = "x"; // lowercase per test
          board[index] = "x";
        } else {
          cell.textContent = "o";
          board[index] = "o";
        }
        cell.classList.add("taken");

        if (checkWinner()) {
          messageDiv.textContent = `${currentPlayer} congratulations you won!`;
          cells.forEach(c => c.classList.add("taken")); // disable all
          return;
        }

        // Switch turn
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        messageDiv.textContent = `${currentPlayer}, you're up`;
      }
    });
  });
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
