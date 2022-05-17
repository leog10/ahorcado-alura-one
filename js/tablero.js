const newGameButton = document.querySelector("#newGame");
let gameWord = "";
let wrongLetters = [];
let correctLetters = [];
let palabras = ["ALURA", "ANGULAR", "PYTHON"];
let gameIsOver = true;
let wrongLetterParagraph = document.querySelector("#wrongLetters");

newGameButton.addEventListener("click", () => {
  createGameBoard(palabras);
});

function resetGameBoard() {
  const divBoard = document.querySelector("#board");
  hideCorrectWord();
  clearCanvas();
  divBoard.textContent = "";
  gameWord = "";
  wrongLetters = [];
  correctLetters = [];
  gameIsOver = false;
  wrongLetterParagraph.textContent = "";
  document.querySelector("#attemptsLeft").textContent = 8;
}

function createGameBoard(palabras) {
  //create div board
  const divBoard = document.querySelector("#board");
  resetGameBoard();

  gameWord = palabras[Math.floor(Math.random() * palabras.length)];

  for (let i = 0; i < gameWord.length; i++) {
    // create letter container
    const divLetterContainer = document.createElement("div");
    const divLetterDash = document.createElement("div");
    const liLetter = document.createElement("li");
    liLetter.classList.add("letter");
    // add number ID to letter. Eg. "letter1, letter2"
    liLetter.id = `letter${i}`;
    divLetterContainer.classList.add("letter_container");
    divLetterDash.classList.add("letter_dash");
    divLetterContainer.appendChild(liLetter);
    divLetterContainer.appendChild(divLetterDash);
    divBoard.appendChild(divLetterContainer);
  }
}

document.addEventListener("keypress", (e) => {
  if (!gameIsOver) {
    gameLogic(e);
  }
});

function gameLogic(e) {
  if (/[a-zA-ZÑñ]/.test(e.key) && e.key != "Enter") {
    let indexes = [];
    let _gameWordSplitted = gameWord.split("");
    let key = e.key.toUpperCase();
    let index = _gameWordSplitted.indexOf(key);
    if (index === -1 && !wrongLetters.includes(key)) {
      wrongLetters.push(key);
    }
    while (index != -1) {
      indexes.push(index);
      index = _gameWordSplitted.indexOf(key, index + 1);
    }
    addCorrectLetter(key, indexes);
    addWrongLetter(wrongLetters);
    if (checkWin()) {
      youWin();
    }
  }
}

function addWrongLetter(wrongLetters) {
  for (let letter of wrongLetters) {
    if (wrongLetterParagraph.textContent.length === 0) {
      decreaseAttempts();
      wrongLetterParagraph.textContent += `${letter}`;
    }
    if (!wrongLetterParagraph.textContent.includes(letter)) {
      decreaseAttempts();
      wrongLetterParagraph.textContent += ` , ${letter}`;
    }
  }
}

function addCorrectLetter(letter, indexes) {
  try {
    for (let index of indexes) {
      document.querySelector(`#letter${index}`).textContent = letter;
      correctLetters[index] = letter;
    }
  } catch (error) {}
}

function decreaseAttempts() {
  let attemptsSpan = document.querySelector("#attemptsLeft");
  drawHangman(attemptsSpan.textContent);
  attemptsSpan.textContent > 1
    ? attemptsSpan.textContent--
    : (attemptsSpan.textContent--, gameOver());
}

function showCorrectWord() {
  document.querySelector(".correct_word").style.display = "block";
  document.querySelector("#gameWord").textContent = gameWord;
}

function hideCorrectWord() {
  document.querySelector(".correct_word").style.display = "none";
  document.querySelector("#gameWord").textContent = "";
}

function checkWin() {
  return JSON.stringify(correctLetters) === JSON.stringify(gameWord.split(""))
    ? true
    : false;
}

function youWin() {
  gameIsOver = true;
  setTimeout(() => {
    alert("GANASTE!");
  }, 10);
}

function gameOver() {
  gameIsOver = true;
  showCorrectWord();
  setTimeout(() => {
    alert("GAME OVER! jajajajaja");
  }, 10);
}

function drawHangman(attemptsLeft) {
  let canvas = document.querySelector("#canvas");
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "red";

  // 1st attempt (base)
  let firstAtt = () => {
    ctx.moveTo(90, 310);
    ctx.lineTo(230, 310);
    ctx.lineWidth = 8;
    ctx.stroke();
  };

  // 2nd attempt (hanger)
  const secondAtt = () => {
    ctx.moveTo(160, 310);
    ctx.lineTo(160, 70);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.lineTo(300, 30);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.lineTo(300, 80);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "red";
    ctx.stroke();
  };

  // 3rd attempt (head)
  const thirdAtt = () => {
    ctx.beginPath();
    ctx.arc(300, 120, 40, 0, 2 * Math.PI);
    ctx.stroke();
  };

  // 4th attempt (body)
  const fourthAtt = () => {
    ctx.moveTo(300, 160);
    ctx.lineTo(300, 240);
    ctx.lineWidth = 8;
    ctx.stroke();
  };

  // 5th attempt (left arm)
  const fifthAtt = () => {
    ctx.moveTo(300, 190);
    ctx.lineTo(240, 180);
    ctx.lineWidth = 8;
    ctx.stroke();
  };

  // 6th attempt (right arm)
  const sixthAtt = () => {
    ctx.moveTo(300, 190);
    ctx.lineTo(360, 180);
    ctx.lineWidth = 8;
    ctx.stroke();
  };

  // 7th attempt (left leg)
  const seventhAtt = () => {
    ctx.moveTo(302, 234);
    ctx.lineTo(240, 280);
    ctx.lineWidth = 8;
    ctx.stroke();
  };

  // 8th attempt (right leg)
  const eighthAtt = () => {
    ctx.moveTo(298, 234);
    ctx.lineTo(360, 280);
    ctx.lineWidth = 8;
    ctx.stroke();
  };

  switch (attemptsLeft) {
    case "8":
      firstAtt();
      break;
    case "7":
      secondAtt();
      break;
    case "6":
      thirdAtt();
      break;
    case "5":
      fourthAtt();
      break;
    case "4":
      fifthAtt();
      break;
    case "3":
      sixthAtt();
      break;
    case "2":
      seventhAtt();
      break;
    case "1":
      eighthAtt();
      break;

    default:
      break;
  }
}

function clearCanvas() {
  let canvas = document.querySelector("#canvas");
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
