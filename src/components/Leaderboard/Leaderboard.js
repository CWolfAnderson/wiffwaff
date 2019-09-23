import React, { useEffect, useState } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Leaderboard.scss';

const oneVOneGames = [
  {
    player1Name: 'Christoph',
    player1Score: 11,
    player2Name: 'Fadi',
    player2Score: 9,
  },
  {
    player1Name: 'Danny',
    player1Score: 11,
    player2Name: 'Fadi',
    player2Score: 13,
  },
];

const twoVTwoGames = [
  {
    team1Player1Name: 'Fadi',
    team1Player2Name: 'Danny',
    team1Score: 9,
    team2Player1Name: 'Christoph',
    team2Player2Name: 'Sean',
    team2Score: 11,
  },
];

const players = {
  Christoph: {
    name: 'Christoph',
    oneVOneWins: 9,
    twoVTwoWins: 11,
  },
  Danny: {
    name: 'Danny',
    oneVOneWins: 7,
    twoVTwoWins: 3,
  },
  Fadi: {
    name: 'Fadi',
    oneVOneWins: 8,
    twoVTwoWins: 4,
  },
  Nelson: {
    name: 'Nelson',
    oneVOneWins: 6,
    twoVTwoWins: 3,
  },
};

oneVOneGames.forEach((match) => {
  const { player1Name, player2Name, player1Score, player2Score } = match;
  // get winnerName
  const winnerName = (player1Score > player2Score) ? player1Name : player2Name;

  // increment score or set score to 1
  if (players[winnerName]) {
    players[winnerName].oneVOneWins += 1;
  } else {
    players[winnerName] = {
      name: winnerName,
      oneVOneWins: 1,
    };
  }
});

console.log('data', Object.values(players));

const columnDefs = [
  { headerName: 'Player', field: 'name' },
  { headerName: '1 v 1 wins', field: 'oneVOneWins' },
  { headerName: '2 v 2 wins', field: 'twoVTwoWins' },
];

const Leaderboard = () => {

  return (
    <div>
      Leaderboard
      <div className="ag-theme-balham grid">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={Object.values(players)}
        />
      </div>
    </div>
  );
};

export default Leaderboard;