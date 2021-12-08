import React from "react";

import '../styles/Score.css';

export default class Score extends React.Component {
  render () {
    return (
      <div className = "snake-score">
        <h1>{"Score: " + this.props.score}</h1>
        {this.props.gameOver ? <h3>Game Over! Better luck next time! <br/> Your score: {this.props.previousScore} </h3> : null }

        <br />
        Press any key to start
        <br /><br />
        Press UP, DOWN, LEFT, RIGHT keys to move
      </div>
    );
  }
};
