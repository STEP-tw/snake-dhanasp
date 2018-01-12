let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  game.moveSnake();
  game.consumeFood();
  processGameEnd(animator);
}

let processGameEnd=function(id){
  if (game.isSnakeEatsItself()|| game.isSnakeEncountersAtBorder()) {
    return stop(id);
  }
}

let stop=function (id) {
  clearInterval(id);
  let button=document.createElement("button");
  button.innerText="New Game";
  button.onclick=startNewgame;
  document.body.appendChild(button);
}

let startNewgame=function(){
  window.location.reload();
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
