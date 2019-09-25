import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './Scoreboard.scss';
import Score from '../Score';
const axios = require('axios');

const playerOptions = [
  { value: 'Christoph', label: 'Christoph' },
  { value: 'Danny', label: 'Danny' },
  { value: 'Edgar', label: 'Edgar' },
  { value: 'Fadi', label: 'Fadi' },
  { value: 'Gerardo', label: 'Gerardo' },
  { value: 'Jen', label: 'Jen' },
  { value: 'Kathy', label: 'Kathy' },
  { value: 'Nelson', label: 'Nelson' },
  { value: 'Sean', label: 'Sean' },
  { value: 'Toni', label: 'Toni' },
  // value: '', label: '',
];

const firstServerServePoints = {
  0: true,
  1: true,
  4: true,
  5: true,
  8: true,
  9: true,
  12: true,
  13: true,
  16: true,
  17: true,
};

const checkForWinner = (blueScore, redScore) => {
  // you have to win by 2 & score has to be >= 11
  if (Math.abs(blueScore - redScore) >= 2
    && (blueScore >= 11
    || redScore >= 11)) {
      return true;
  }
}

const Scoreboard = () => {

  const [blueTeam, setBlueTeam] = useState([]);
  const [redTeam, setRedTeam] = useState([]);

  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  const [teamServingFirst, setTeamServingFirst] = useState();
  const [teamReceivingFirst, setTeamReceivingFirst] = useState();

  const [history, setHistory] = useState([]);
  // `history` will look like this: ['red', 'red', 'blue',...] based on who got the point

  useEffect(() => {
    const isWinner = checkForWinner(blueScore, redScore);

    const handleKeypress = (e) => {
      // console.log('e', e);
      console.log('history before', history);
    
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowDown') && !isWinner) { // blue team point
        if (!teamServingFirst) {
          setTeamServingFirst('blue');
          setTeamReceivingFirst('red');
        } else {
          setBlueScore(blueScore + 1);
          setHistory([...history, 'blue']);
          // checkWhoIsServing(blueScore, redScore);
        }
      } else if ((e.key === 'ArrowRight' || e.key === 'ArrowUp') && !isWinner) { // red team point
        if (!teamServingFirst) {
          setTeamServingFirst('red');
          setTeamReceivingFirst('blue');
        } else {
          setRedScore(redScore + 1);
          setHistory([...history, 'red']);
          // checkWhoIsServing(blueScore, redScore);
        }
      } else if (e.key === 'c') {

        if (isWinner) {
          // store teams & w's / l's
          if (blueTeam.length === 1 && redTeam.length === 1) {
            const player1Name = blueTeam[0].label;
            const player1Score = blueScore;
            const player2Name = redTeam[0].label;
            const player2Score = redScore;

            const params = {
              player1Name,
              player1Score,
              player2Name,
              player2Score,
            };

            console.log('params', params);

            axios.get('https://us-central1-wiff-waff2.cloudfunctions.net/addOneVOneMatch', {
              params,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          }
        }

        setBlueScore(0);
        setRedScore(0);
        setHistory([]);
        setTeamServingFirst(undefined);
        setTeamReceivingFirst(undefined);
      } else if (e.key === 'u') {
        if (history.length > 0) {
          const userToRemovePointFrom = history.pop();
          if (userToRemovePointFrom === 'blue') {
            setBlueScore(blueScore - 1);
          } else if (userToRemovePointFrom === 'red') {
            setRedScore(redScore - 1);
          }
        } else {
          setTeamServingFirst(undefined);
          setTeamReceivingFirst(undefined);
        }
      }
      console.log('history', history);
    }

    window.addEventListener('keyup', handleKeypress);

    return () => {
      window.removeEventListener('keyup', handleKeypress);
    };
  });

  let sumPoints = blueScore + redScore;

  let teamServing = firstServerServePoints[sumPoints] ? teamServingFirst : teamReceivingFirst;
  if (!teamServingFirst) teamServing = undefined;

  if (sumPoints === 0) teamServing = teamServingFirst;
  console.log('sumPoints', sumPoints);

  if (sumPoints >= 20) {
    if (sumPoints % 2 === 0) {
      teamServing = teamServingFirst;
    } else {
      teamServing = teamReceivingFirst;
    }
  }

  const isWinner = checkForWinner(blueScore, redScore);

  let winnerMessage = '';
  if (isWinner) {
    if (blueScore > redScore) {
      if (blueTeam.length === 1) {
        winnerMessage = `${blueTeam[0].label} wins!`;
      } else if (blueTeam.length === 2) {
        winnerMessage = `${blueTeam[0].label} and ${blueTeam[1].label} win!`;
      } else {
        winnerMessage = 'Blue team wins!';
      }
    } else {
      if (redTeam.length === 1) {
        winnerMessage = `${redTeam[0].label} wins!`;
      } else if (redTeam.length === 2) {
        winnerMessage = `${redTeam[0].label} and ${redTeam[1].label} win!`;
      } else {
        winnerMessage = 'Red team wins!';
      }
    }
  }

  return (
    <div>
      <div className="winnerMessage">
        {winnerMessage}
      </div>
      <div
        className={`${isWinner ? 'isWinner' : ''} scoreboard`}
      >
        <div>
          <Score
            isServing={teamServing === 'blue'}
            score={blueScore}
            team="blue"
          />
          <Select
            isMulti
            onChange={(team) => {console.log('team', team); setBlueTeam(team)}}
            options={playerOptions.filter(player => !redTeam.includes(player))}
            value={blueTeam}
          />
        </div>
        <div>
          <Score
            isServing={teamServing === 'red'}
            team="red"
            score={redScore}
          />
          <Select
            clearValue={[]}
            isMulti
            onChange={(team) => {console.log('team', team); setRedTeam(team)}}
            // options={playerOptions}
            options={playerOptions.filter(player => !blueTeam.includes(player))}
            value={redTeam}
          />
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;