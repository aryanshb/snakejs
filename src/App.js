import React from 'react';

import Snake from './components/Snake';

import './App.css'

export default class App extends React.Component {
  render () {
    return (
      <div className = "app">
        <Snake />
      </div>
    )
  }
};
