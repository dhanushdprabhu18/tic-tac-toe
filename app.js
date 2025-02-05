let currentPlayer = "X"; // The first player is X
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");

const checkWin = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
};

const checkDraw = () => {
  return gameBoard.every(cell => cell !== "");
};

const showWinner = (winner) => {
  msg.innerText = winner === "X" ? "Player X Wins!" : "Player O Wins!";
  msg.style.backgroundColor = "green";
  msgContainer.classList.remove("hide");

  // Trigger Party Blast animation
  for (let i = 0; i < 10; i++) {
    const partyBlast = document.createElement("div");
    partyBlast.classList.add("party-blast");
    document.body.appendChild(partyBlast);

    // Randomize positions of the party blasts
    partyBlast.style.top = `${Math.random() * 100}vh`;
    partyBlast.style.left = `${Math.random() * 100}vw`;

    // Remove the party blast animation after it finishes
    setTimeout(() => {
      partyBlast.remove();
    }, 2000);
  }

  isGameOver = true;
};

const showDraw = () => {
  msg.innerText = "It's a Draw!";
  msg.style.backgroundColor = "yellow";
  msgContainer.classList.remove("hide");
  isGameOver = true;
};

const handleBoxClick = (index) => {
  if (gameBoard[index] || isGameOver) return;

  gameBoard[index] = currentPlayer;
  boxes[index].innerText = currentPlayer;

  const winner = checkWin();
  if (winner) {
    showWinner(winner);
  } else if (checkDraw()) {
    showDraw();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

const resetGame = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach(box => box.innerText = "");
  currentPlayer = "X";
  isGameOver = false;
  msgContainer.classList.add("hide");
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleBoxClick(index));
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
