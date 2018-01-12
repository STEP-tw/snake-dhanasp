let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  game.moveSnake();
  game.consumeFood();
  // if(game.snake.head.isSameCoordAs(food)) {
  //   snake.grow();
  //   createFood(numberOfRows,numberOfCols);
  //   drawFood(food);
  // }
  processGameEnd(game.snake,numberOfCols,numberOfRows,animator);

}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      game.snake.turnLeft();
      break;
    case "KeyD":
      game.snake.turnRight();
      break;
    case "KeyC":
      game.snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const loadGame=function(){
  animator=setInterval(animateSnake,140)
}

const startGame=function() {
  game=new Game(numberOfRows,numberOfCols);
  game.drawGrids();
  game.drawSnake();
  game.drawFood();
  addKeyListener();
  loadGame();
}

window.onload=startGame;
