/*****************
GAME RULES:

- This game is designed for 2 players
- Each player rolls the dice to add to their round score
- If a player rolles a 1, their round score is lost. The next player gets to roll the dice now.
- Each round the player can choose to "Hold" and add their current round score to their total. The next player gets to roll the dice now.
- The first player to reach the "Winning score" (default = 100) wins the game

******************/

// variables
let scores, roundScore, activePlayer, gamePlaying, winningScore, canSetScore;

// initialise
initGame();

// roll dice button
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    // 1. random number
    let dice = Math.ceil(Math.random() * 6);

    // 2. display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // 3. update round score if the rolled number was not a 1
    if (dice !== 1) {
      // add score
      roundScore += dice;

      // set current score of active player
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // change to next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-score").addEventListener("click", function() {
  if (canSetScore) {
    winningScore = document.querySelector("#set-score").value;

    document.querySelector(".score-to-win").textContent =
      "Score to win is " + winningScore;

    document.querySelector(".winning-score").style.display = "none";
    canSetScore = false;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      // player has won the game
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // change to next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", initGame);

function initGame() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  canSetScore = true;
  if (winningScore == null) winningScore = 100; // default score

  // hide dice to start with
  document.querySelector(".dice").style.display = "none";

  // set initial scores
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // reset names
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector(".winning-score").style.display = "block";
}

// change to next player
function nextPlayer() {
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // reset current scores
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // hide dice
  document.querySelector(".dice").style.display = "none";
}
