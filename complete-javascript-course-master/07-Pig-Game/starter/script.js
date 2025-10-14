'use strict';
//declaring variables
let scorePLayer0 = 0;
let scorePLayer1 = 0;
let currentScore = 0;
let playing = true;

//selecting elements
const Players = document.querySelectorAll('.player');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const namePlayer1 = document.getElementById('name--0');
const namePlayer2 = document.getElementById('name--1');

//loop through players to find active player
//roll dice functionality
rollBtn.addEventListener('click', function () {
  if (!playing) return;
  const dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  document.querySelector('.dice').src = `dice-${dice}.png`;

  //display dice
  if (dice !== 1) {
    if (Players[0].classList.contains('player--active')) {
      currentScore += dice;
      document.getElementById('current--0').textContent = currentScore;
    } else {
      currentScore += dice;
      document.getElementById('current--1').textContent = currentScore;
    }
  }
  //lose current score
  else if (dice === 1) {
    if (Players[0].classList.contains('player--active')) {
      currentScore = 0;
      document.getElementById('current--0').textContent = currentScore;
    } else {
      currentScore = 0;
      document.getElementById('current--1').textContent = currentScore;
    }
    //switch player if dice is 1
    console.log('Switch');
    if (Players[0].classList.contains('player--active')) {
      Players[0].classList.remove('player--active');
      Players[1].classList.add('player--active');
    } else {
      Players[0].classList.add('player--active');
      Players[1].classList.remove('player--active');
    }
  }
});

//hold button functionality
holdBtn.addEventListener('click', function () {
  if (!playing) return;
  console.log('Hold');
  if (Players[0].classList.contains('player--active')) {
    scorePLayer0 += currentScore;
    document.getElementById('score--0').textContent = scorePLayer0;
    currentScore = 0;
    document.getElementById('current--0').textContent = currentScore;
    Players[0].classList.remove('player--active');
    Players[1].classList.add('player--active');
    if (scorePLayer0 >= 100) {
      namePlayer1.textContent = 'Winner!';
      namePlayer1.style.backgroundColor = '#fff';
      namePlayer1.style.color = '#000';
      namePlayer1.style.borderRadius = '10px';
      namePlayer1.style.padding = '10px';
      Players[0].classList.add('player--winner');
      Players[0].classList.remove('player--active');
      Players[1].classList.remove('player--active');
      playing = false;
    }
  } else {
    scorePLayer1 += currentScore;
    document.getElementById('score--1').textContent = scorePLayer1;
    currentScore = 0;
    document.getElementById('current--1').textContent = currentScore;
    Players[0].classList.add('player--active');
    Players[1].classList.remove('player--active');
    if (scorePLayer1 >= 100) {
      namePlayer2.textContent = 'Winner!';
      namePlayer2.style.backgroundColor = '#fff';
      namePlayer2.style.color = '#000';
      namePlayer2.style.borderRadius = '10px';
      namePlayer2.style.padding = '10px';
      Players[1].classList.add('player--winner');
      Players[0].classList.remove('player--active');
      Players[1].classList.remove('player--active');
      playing = false;
    }
  }
});

newBtn.addEventListener('click', function () {
  //reset all variables and states
  scorePLayer0 = 0;
  scorePLayer1 = 0;
  currentScore = 0;
  playing = true;

  //reset scores in UI
  document.getElementById('score--0').textContent = scorePLayer0;
  document.getElementById('score--1').textContent = scorePLayer1;
  document.getElementById('current--0').textContent = currentScore;
  document.getElementById('current--1').textContent = currentScore;
  if (!Players[0].classList.contains('player--active')) {
    Players[0].classList.add('player--active');
    Players[1].classList.remove('player--active');
  }
  Players[0].classList.remove('player--winner');
  Players[1].classList.remove('player--winner');
  namePlayer1.textContent = 'Player 1';
  namePlayer2.textContent = 'Player 2';
  namePlayer1.style.backgroundColor = 'transparent';
  namePlayer1.style.color = '#fff';
  namePlayer1.style.borderRadius = '0px';
  namePlayer1.style.padding = '0px';
  namePlayer2.style.backgroundColor = 'transparent';
  namePlayer2.style.color = '#fff';
  namePlayer2.style.borderRadius = '0px';
  namePlayer2.style.padding = '0px';
  document.querySelector('.dice').src = `dice-1.png`;
});
