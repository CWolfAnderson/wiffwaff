let blueScore = 0;
let redScore = 0;

let lastScoreUpdated;

const bodyElem = document.querySelector('body');
const blueScoreElem = document.getElementById('blue-score');
const redScoreElem = document.getElementById('red-score');

const checkForWinner = (blueScore, redScore) => {
  if (blueScore === 11) {
    bodyElem.style.backgroundColor = 'green';
  } else if (blueScore === 11) {
    bodyElem.style.backgroundColor = 'green';
  }
}

document.addEventListener('keyup', (e) => {
  console.log('e', e);

  if (e.key === 'ArrowLeft') {
    blueScore += 1;
    blueScoreElem.innerHTML = blueScore;
    lastScoreUpdated = 'blue';
    checkForWinner(blueScore, redScore);
  } else if (e.key === 'ArrowRight') {
    redScore += 1;
    redScoreElem.innerHTML = redScore;
    lastScoreUpdated = 'red';
    checkForWinner(blueScore, redScore);
  } else if (e.key === 'c') {
    blueScore = 0;
    redScore = 0;
    blueScoreElem.innerHTML = blueScore;
    redScoreElem.innerHTML = redScore;
    bodyElem.style.backgroundColor = 'white';
  } else if (e.key === 'u') {
    if (lastScoreUpdated === 'blue') {
      blueScore -= 1;
      blueScoreElem.innerHTML = blueScore;
      bodyElem.style.backgroundColor = 'white';
    } else if (lastScoreUpdated === 'red') {
      redScore -= 1;
      redScoreElem.innerHTML = redScore;
      bodyElem.style.backgroundColor = 'white';
    }
  }
});
