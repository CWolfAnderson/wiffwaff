let blueScore = 0;
let redScore = 0;

let teamServing;
let isWinner = false;

const bodyElem = document.querySelector('body');
const blueScoreElem = document.getElementById('blue-score');
const redScoreElem = document.getElementById('red-score');

const history = []; // will look like this: ['red', 'red', 'blue',...] based on who got the point

const checkForWinner = (blueScore, redScore) => {
  // you have to win by 2
  if (Math.abs(blueScore - redScore) >= 2
    && (blueScore >= 11
    || redScore >= 11)) {
    if (blueScore > redScore) {
      bodyElem.style.backgroundColor = 'black';
      isWinner = true;
      redScoreElem.style.textDecoration = 'none';
      blueScoreElem.style.textDecoration = 'none';
    } else {
      bodyElem.style.backgroundColor = 'black';
      isWinner = true;
      redScoreElem.style.textDecoration = 'none';
      blueScoreElem.style.textDecoration = 'none';
    }
  } else {
    checkWhoIsServing(blueScore, redScore);
  }
}

const swapServingTeamTo = (team) => {
  if (team === 'blue') {
    teamServing = 'blue';
    blueScoreElem.style.textDecoration = 'underline';
    redScoreElem.style.textDecoration = 'none';
  } else if (team === 'red') {
    teamServing = 'red';
    redScoreElem.style.textDecoration = 'underline';
    blueScoreElem.style.textDecoration = 'none';
  }
}

const checkWhoIsServing = (blueScore, redScore) => {
  if ((blueScore === 10 && redScore === 10)
    || (blueScore >= 10 && redScore >= 10)) {
    if (teamServing === 'red') {
      swapServingTeamTo('blue');
    } else if (teamServing === 'blue') {
      swapServingTeamTo('red');
    }
  } else {
    if ((blueScore + redScore) % 2 === 0) {
      if (teamServing === 'red') {
        swapServingTeamTo('blue');
      } else if (teamServing === 'blue') {
        swapServingTeamTo('red');
      }
    }
  }
}

document.addEventListener('keyup', (e) => {
  console.log('e', e);

  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { // blue team point
    if (!teamServing) {
      teamServing = 'blue';
      blueScoreElem.style.textDecoration = 'underline';
    } else {
      if (!isWinner) {
        blueScore += 1;
        blueScoreElem.innerHTML = blueScore;
        history.push('blue');
        checkForWinner(blueScore, redScore);
      }
    }
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { // red team point
    if (!teamServing) {
      teamServing = 'red';
      redScoreElem.style.textDecoration = 'underline';
    } else {
      if (!isWinner) {
        redScore += 1;
        redScoreElem.innerHTML = redScore;
        history.push('red');
        checkForWinner(blueScore, redScore);
      }
    }
  } else if (e.key === 'c') {
    blueScore = 0;
    redScore = 0;
    blueScoreElem.innerHTML = blueScore;
    redScoreElem.innerHTML = redScore;
    redScoreElem.style.textDecoration = 'none';
    blueScoreElem.style.textDecoration = 'none';
    bodyElem.style.backgroundColor = 'white';
    isWinner = false;
    history = [];
  } else if (e.key === 'u') {
    if (history.length > 0) {
      const userToRemovePointFrom = history.pop();
      if (userToRemovePointFrom === 'blue') {
        blueScore -= 1;
        blueScoreElem.innerHTML = blueScore;
        bodyElem.style.backgroundColor = 'white';
      } else if (userToRemovePointFrom === 'red') {
        redScore -= 1;
        redScoreElem.innerHTML = redScore;
        bodyElem.style.backgroundColor = 'white';
      }
    }
  }
});
