import React from 'react';
import './Score.scss';

const Score = ({ isServing, score, team }) => (
  <div className={`${team}-team team`}>
    <span
      id={`${team}-score`}
      className={`${isServing ? 'serving' : ''} score`}
    >
      {score}
    </span>
  </div>
);

export default Score;