import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './Home.scss';
import Scoreboard from '../Scoreboard';
import Leaderboard from '../Leaderboard';

export default class Home extends Component {

  render() {

    return (
      <div>
        <Helmet>
          <title>WiffWaff</title>
        </Helmet>

        <div className="container">
          <Scoreboard />
        </div>

        <Leaderboard />

        <div className="instructions">
          <strong>
            Instructions:
          </strong>
          "↑ ↓ ← →" to increment points, "c" to clear scoreboard, "u" to undo change(s)
        </div>
      </div>
    );
  }
}