const newGameButton = document.querySelector("#newGame");
let gameWord = "";
let wrongLetters = [];
let correctLetters = [];
let words = ["ALURA", "ANGULAR", "PYTHON", "PAPANATA", "PROGRAMADOR"];
let customWord = [];
let gameIsOver = true;
let wrongLetterParagraph = document.querySelector("#wrongLetters");

document.addEventListener("keypress", (e) => {
  if (!gameIsOver) {
    gameLogic(e.key);
  } else {
    this.removeEventListener("keypress", e);
  }
});

function openKeyboard() {
  document.querySelector("#inputMobile").focus();
}

document.querySelector("#inputMobile").addEventListener("keyup", (e) => {
  key = document.querySelector("#inputMobile").value;
  document.querySelector("#inputMobile").value = "";
  if (!gameIsOver) {
    gameLogic(key);
  } else {
    document.querySelector("#inputMobile").blur();
    this.removeEventListener("keyup", e);
  }
});

function startNewGame() {
  document.querySelector(".start").style.display = "none";
  document.querySelector(".new_game").style.display = "flex";
  customWord = [];
  newGame();
}

function quitGame() {
  document.querySelector(".start").style.display = "flex";
  document.querySelector(".new_game").style.display = "none";
  customWord = [];
  gameIsOver = true;
}

function goHome() {
  document.querySelector(".start").style.display = "flex";
  document.querySelector(".new_word").style.display = "none";
  document.querySelector(".new_word_added").style.display = "none";
  document.querySelector("#newWord").classList.remove("input_error");
  document.querySelector("#newWord").classList.remove("input_correct");
  document.querySelector("#warningErrorWord").style.display = "none";
  document.querySelector("#warningErrorNewCustomGame").style.display = "none";
  customWord = [];
}

function customWordScreen() {
  document.querySelector("#newWord").value = "";
  document.querySelector(".start").style.display = "none";
  document.querySelector(".new_word").style.display = "flex";
}

function addCustomWord() {
  if (document.querySelector("#newWord").value.length < 3) {
    document.querySelector("#warningErrorWord").style.display = "block";
    document.querySelector(".new_word_added").style.display = "none";
  } else {
    document.querySelector("#warningErrorNewCustomGame").style.display = "none";
    const _customWord = document.querySelector("#newWord").value.toUpperCase();
    customWord.push(_customWord);
    document.querySelector("#newWord").value = "";
    newWordAdded();
  }
}

function newWordAdded() {
  document.querySelector(".new_word_added").style.display = "inline-block";
  setTimeout(() => {
    document.querySelector(".new_word_added").classList.add("expand");
  }, 50);
  setTimeout(() => {
    document.querySelector(".new_word_added").classList.remove("expand");
  }, 500);
}

document.querySelector("#newWord").addEventListener("keyup", () => {
  if (document.querySelector("#newWord").value.length < 3) {
    document.querySelector("#warningErrorNewCustomGame").style.display = "none";
    document.querySelector("#newWord").classList.remove("input_correct");
    document.querySelector("#newWord").classList.add("input_error");
  } else {
    document.querySelector("#warningErrorWord").style.display = "none";
    document.querySelector("#newWord").classList.remove("input_error");
    document.querySelector("#newWord").classList.add("input_correct");
  }
});

function playCustomWord() {
  if (customWord.length < 1) {
    document.querySelector("#warningErrorNewCustomGame").style.display =
      "block";
  } else {
    document.querySelector(".new_word_added").style.display = "none";
    document.querySelector("#newWord").classList.remove("input_error");
    document.querySelector("#newWord").classList.remove("input_correct");
    document.querySelector("#warningErrorWord").style.display = "none";
    document.querySelector(".new_word").style.display = "none";
    document.querySelector(".new_game").style.display = "flex";
    newGame();
  }
}

function newGame() {
  newGameButton.blur();
  if (customWord[0]) {
    createGameBoard(customWord);
  } else {
    createGameBoard(words);
  }
}

function resetGameBoard() {
  const divBoard = document.querySelector("#board");
  hideCorrectWord();
  clearCanvas();
  divBoard.textContent = "";
  wrongLetters = [];
  correctLetters = [];
  gameIsOver = false;
  wrongLetterParagraph.textContent = "";
  document.querySelector("#attemptsLeft").textContent = 6;
  drawHanger();
  document.querySelector(".endMessage").style.display = "none";
}

function randomWord(words) {
  let newGameWord = gameWord;
  gameWord = words[Math.floor(Math.random() * words.length)];

  while (gameWord == newGameWord) {
    gameWord = words[Math.floor(Math.random() * words.length)];
  }
}

function createGameBoard(words) {
  //create div board
  const divBoard = document.querySelector("#board");
  resetGameBoard();

  randomWord(words);

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

function gameLogic(eventKey) {
  if (/[a-zA-ZÑñ]/.test(eventKey) && eventKey != "Enter") {
    let indexes = [];
    let _gameWordSplitted = gameWord.split("");
    let key = eventKey.toUpperCase();
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
    endMsg("#00d400", "Ganaste!🎉");
  }, 10);
}

function gameOver() {
  gameIsOver = true;
  document.querySelector("#inputMobile").blur();
  showCorrectWord();
  setTimeout(() => {
    endMsg("red", "Perdiste!⚰️");
  }, 50);
}

function endMsg(color, text) {
  document.querySelector(".endMessage").style.display = "block";
  document.querySelector(".endMessage").style.color = color;
  document.querySelector(".endMessage").textContent = text;
}

function drawHangman(attemptsLeft) {
  // 1st attempt (head)
  const secondAtt = () => {
    drawCircle(280, 100, 25);
  };

  // 2nd attempt (body)
  const thirdAtt = () => {
    drawLine(280, 130, 280, 180);
  };

  // 3th attempt (left arm)
  const fourthAtt = () => {
    drawLine(280, 140, 250, 170);
  };

  // 4th attempt (right arm)
  const fifthAtt = () => {
    drawLine(280, 140, 310, 170);
  };

  // 5th attempt (left leg)
  const sixthAtt = () => {
    drawLine(280, 180, 250, 240);
  };

  // 6th attempt (right leg)
  const seventhAtt = () => {
    drawLine(280, 180, 310, 240);
  };

  switch (attemptsLeft) {
    case "6":
      secondAtt();
      break;
    case "5":
      thirdAtt();
      break;
    case "4":
      fourthAtt();
      break;
    case "3":
      fifthAtt();
      break;
    case "2":
      sixthAtt();
      break;
    case "1":
      seventhAtt();
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

function openModal(text, call) {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector("#modalText").textContent = text;
  document.querySelector("#modalOk").onclick = () => {
    call();
    document.querySelector(".overlay").style.display = "none";
  };
}

function cancelModal() {
  document.querySelector(".overlay").style.display = "none";
}
