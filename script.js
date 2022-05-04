"use strict";

// selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// state variables
let activePlayer;
let currentScore;
let scores;
let gameInPlay;

// reusable functions (DRY)
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer ? 0 : 1;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const resetGame = () => {
  // starting conditions
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  gameInPlay = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  // reseting conditions
  // no need for if statements with contained as JS would not add or remove a class twice
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// game would reset when game loads
resetGame();

// rolling dice
btnRoll.addEventListener("click", () => {
  if (gameInPlay) {
    // generating random dice roll
    const roll = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${roll}.png`;

    // check if roll is one
    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (gameInPlay) {
    // add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if total score is greater than or = 100
    if (scores[activePlayer] >= 100) {
      // finish game
      gameInPlay = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", resetGame);
