const Game=function(topLeft,bottomRight) {
  this.topLeft=topLeft;
  this.bottomRight=bottomRight;
  this.snake={};
  this.food={};
}

Game.prototype.addSnake=function(snake) {
  this.snake=snake;
}

Game.prototype.getSnake=function() {
  return snake;
}

Game.prototype.turnLeft=function() {
  return this.snake.turnLeft();
}

Game.prototype.turnRight=function() {
  return this.snake.turnRight();
}

Game.prototype.grow=function() {
  return this.snake.grow();
}

Game.prototype.move=function() {
  let details={};
  details.oldHead=this.snake.getHead();
  details.oldTail=this.snake.move();
  details.head=this.snake.getHead();
  return details;
}
