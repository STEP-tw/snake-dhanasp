let processGameEnd=function(snake,rows,cols,id){
  let snakeXPos=snake.head.x;
  let snakeYPos=snake.head.y;
  if (isSnakeEatsItself(snake)) {
    return stop(id)
  }
  if (isSnakeEncountersToTopAndBottomBorder(snakeYPos)) {
    return stop(id);
  }
  if (isSnakeEncountersToLeftAndRightBorder(snakeXPos)) {
    return stop(id);
  }

}
let isSnakeEatsItself=function(snake){
  let head=snake.getHead();
  let body=snake.getBody();
  return body.some(function(partOfBody){
    return head.isSameCoordAs(partOfBody);
  });
}

let isSnakeEncountersToTopAndBottomBorder=function(snakeYPos) {
  return snakeYPos==0|| snakeYPos==59;
}

let isSnakeEncountersToLeftAndRightBorder=function(snakeXPos){
  return snakeXPos==0|| snakeXPos==119;
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
