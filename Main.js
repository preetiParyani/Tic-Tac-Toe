let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

//Add Click Event Listener to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box got clicked");
    if (turnO === true) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    count++;

    let isWinner = CheckWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const CheckWinner = () => {
  for (pattern of winPatterns) {
    let Pos1Val = boxes[pattern[0]].innerText;
    let Pos2Val = boxes[pattern[1]].innerText;
    let Pos3Val = boxes[pattern[2]].innerText;

    if (Pos1Val != "" && Pos2Val != "" && Pos3Val != "") {
      if (Pos1Val === Pos2Val && Pos2Val === Pos3Val) {
        showWinner(Pos1Val);
        return true;
      }
    }
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
