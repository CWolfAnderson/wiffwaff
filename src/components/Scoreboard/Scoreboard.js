import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './Scoreboard.scss';
import Score from '../Score';

const players = [
    { value: 'Christoph', label: 'Christoph' },
    { value: 'Danny', label: 'Danny' },
    { value: 'Edgar', label: 'Edgar' },
    { value: 'Fadi', label: 'Fadi' },
    { value: 'Kathy', label: 'Kathy' },
    { value: 'Nelson', label: 'Nelson' },
    { value: 'Sean', label: 'Sean' },
    { value: 'Toni', label: 'Toni' },
    // value: '', label: '',
]

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

const isWinner = (blueScore, redScore) => {
  // you have to win by 2 & score has to be >= 11
  if (Math.abs(blueScore - redScore) >= 2
    && (blueScore >= 11
    || redScore >= 11)) {
      return true;
  }
}

const Scoreboard = () => {

  const [blueTeam, setBlueTeam] = useState(0);
  const [redTeam, setRedTeam] = useState(0);

  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  const [teamServingFirst, setTeamServingFirst] = useState();
  const [teamReceivingFirst, setTeamReceivingFirst] = useState();

  const [history, setHistory] = useState([]);
  // `history` will look like this: ['red', 'red', 'blue',...] based on who got the point

  useEffect(() => {
    // const handleKeypress = 
    const handleKeypress = (e) => {
      // console.log('e', e);
      console.log('history before', history);
    
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowDown') && !isWinner(blueScore, redScore)) { // blue team point
        if (!teamServingFirst) {
          setTeamServingFirst('blue');
          setTeamReceivingFirst('red');
        } else {
          setBlueScore(blueScore + 1);
          setHistory([...history, 'blue']);
          // checkWhoIsServing(blueScore, redScore);
        }
      } else if ((e.key === 'ArrowRight' || e.key === 'ArrowUp') && !isWinner(blueScore, redScore)) { // red team point
        if (!teamServingFirst) {
          setTeamServingFirst('red');
          setTeamReceivingFirst('blue');
        } else {
          setRedScore(redScore + 1);
          setHistory([...history, 'red']);
          // checkWhoIsServing(blueScore, redScore);
        }
      } else if (e.key === 'c') {
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

  return (
    <div className="scoreboard">
      <div>
        <Score
          isServing={teamServing === 'blue'}
          score={blueScore}
          team="blue"
        />
        <Select
          isMulti
          onChange={(team) => {console.log('team', team); setBlueTeam(team)}}
          options={players}
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
          isMulti
          onChange={(team) => {console.log('team', team); setRedTeam(team)}}
          options={players}
          value={redTeam}
        />
      </div>
    </div>
  );
};

export default Scoreboard;