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
  attemptsSpan.textContent > 1
    ? attemptsSpan.textContent--
    : (attemptsSpan.textContent--, gameOver());
}

function showCorrectWord() {
  document.querySelector(".correct_word").style.display = "block";
  document.querySelector("#gameWord").textContent = gameWord;
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
