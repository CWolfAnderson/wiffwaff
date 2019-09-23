import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './components/Home';
import Stats from './components/Stats';

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Wiffwaff</title>
        </Helmet>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/stats" component={Stats} />
          </div>
        </Router>
      </div>
    );
  }
}