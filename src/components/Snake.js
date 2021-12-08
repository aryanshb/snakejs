import React from "react";

import Food from "./Food"
import "../App.css"

const getRandomCoordinates = () => {
  const min = 1;
  const max = 98;
  const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

const SnakeBody = (props) => {
  const snakeBody = props.snakeDots.map((dot, index) => {
    const style = {
        left: `${dot[0]}%`,
        top:  `${dot[1]}%`
    };

    return <div className = "snake-dot" key = {index} style = {style}></div>
  });
  
  return (
    <div className = "snake-body">
      {snakeBody}
    </div>
  )
};

export default class Snake extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      speed: 100,
      food: getRandomCoordinates(),
      direction: 'RIGHT',
      snakeDots: [
        [0,0],
        [2,0],
        [4,0]
      ]
    };

    this.moveSnake = this.moveSnake.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount () {
    setInterval(this.moveSnake, this.state.speed);
    
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  componentDidUpdate(){
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown (event) {
    switch (event.keyCode) {
      case 38:
        if (!["UP", "DOWN"].includes(this.state.direction))
          this.setState({ direction: "UP" });
        break;
      
      case 40:
        if (!["UP", "DOWN"].includes(this.state.direction))
          this.setState({ direction: "DOWN" });
        break;
      
      case 37:
        if (!["LEFT", "RIGHT"].includes(this.state.direction))
          this.setState({ direction: "LEFT" });  
        break;
      
      case 39:
        if (!["LEFT", "RIGHT"].includes(this.state.direction))
          this.setState({ direction: "RIGHT" });
        break;
      
      default: break;
    }
  };

  moveSnake () {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      
      case 'UP':
        head = [head[0], head[1] - 2];
        break;  
      
      default: break;
    }

    dots.push(head);
    dots.shift();
    
    this.setState({
      snakeDots: dots
    });
  }

  checkIfOutOfBorders () {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0)
      this.onGameOver();
  }

  checkIfCollapsed(){
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if(head[0] === dot[0] && head[1] === dot[1])
        this.onGameOver();
    })
  }

  checkIfEat () {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if (head[0] === food[0] && head[1] === food[1]){
      this.setState({
        food: getRandomCoordinates()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake () {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots:newSnake
    });
  }

  increaseSpeed () {
    if (this.state.speed > 10)
      this.setState({
        speed: this.state.speed - 10
      });
  }
  
  onGameOver () {
    alert(`Game Over, Snake length is ${this.state.snakeDots.length}`);

    this.setState({
      speed:100,
      food: getRandomCoordinates(),
      direction:'RIGHT',
      snakeDots:[
        [0,0],
        [2,0],
        [4,0]
      ]
    });
  }

  render(){
    return (
      <div className = "snake-app">
        <SnakeBody snakeDots = {this.state.snakeDots}/>
        <Food dot = {this.state.food}/>
        {/* <Score value = {this.state.snakeDots.length - 3} /> */}
      </div>
    );  
  }
}
