let processGameEnd=function(snake,rows,cols){
  let snakeXPos=snake.head.x;
  let snakeYPos=snake.head.y;
  if (isSnakeEatsItself(snake)) {
  }
  if (isSnakeEncountersToTopAndBottomBorder(snakeYPos)) {
    stop();
  }
  if (isSnakeEncountersToLeftAndRightBorder(snakeXPos)) {
    stop()
  }

}
let isSnakeEatsItself=function(snake){
  let head=snake.getHead();
  let body=snake.getBody();
  body.forEach(function(partOfBody){
    if(head.isSameCoordAs(partOfBody)){
      console.log("m eating myself");
    }
  });
}

let isSnakeEncountersToTopAndBottomBorder=function(snakeYPos) {
  return snakeYPos==0|| snakeYPos==60;
}

let isSnakeEncountersToLeftAndRightBorder=function(snakeXPos){
  return snakeXPos==0|| snakeXPos==120;
}

let stop=function () {

}
