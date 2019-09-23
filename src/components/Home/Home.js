import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './Home.scss';
import Scoreboard from '../Scoreboard';

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
      </div>
    );
  }
}