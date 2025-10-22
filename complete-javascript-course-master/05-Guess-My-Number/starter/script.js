'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = '🎉 Correct Number!';

// document.querySelector('.number').textContent =
//   document.querySelector('.score').textContent;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);
// console.log('here'); // to make sure the file is linked properly

// !----------------------------------------------------------------------------------

//*-------------------- Project: Guess My Number!

let secretNumber = calcSecretNumber();
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  // When there is no input
  if (!guess) {
    displayMessage('⛔ No number!');
    document.querySelector('body').style.backgroundColor = 'red';
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    } else {
      document.querySelector('body').style.backgroundColor = 'red';
      score--;
      document.querySelector('.score').textContent = score;
      displayMessage('💥 You lost the game!');
    }
  }
});

// When the player clicks the "Again!" button
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = calcSecretNumber();
  document.querySelector('.number').textContent = '?';
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start guessing...');
});

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

function calcSecretNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

// !----------------------------------------------------------------------------------
