let processGameEnd=function(snake,rows,cols){
  let snakeXPos=snake.head.x;
  let snakeYPos=snake.head.y;
  if (isSnakeEncountersToTopAndBottomBorder(snakeYPos)) {
    console.log("i m at border");
  }
  if (isSnakeEncountersToLeftAndRightBorder(snakeXPos)) {
    console.log("i m at border");

  }

}

let isSnakeEncountersToTopAndBottomBorder=function(snakeYPos) {
  return snakeYPos==0|| snakeYPos==60;
}

let isSnakeEncountersToLeftAndRightBorder=function(snakeXPos){
  return snakeXPos==0|| snakeXPos==120;
}

let stop=function () {

}
