const Game = function(numberOfRows, numberOfCols) {
  this.numberOfRows = numberOfRows;
  this.numberOfCols = numberOfCols;
  this.snake = '';
}
Game.prototype = {
  createSnake: function() {
    let tail = new Position(12, 10, "east");
    let body = [];
    body.push(tail);
    body.push(tail.next());
    let head = tail.next().next();
    this.snake = new Snake(head, body);
  },
  drawGrids: function() {
    return drawGrids(this.numberOfRows, this.numberOfCols);
  },
  drawSnake: function() {
    this.createSnake();
    return drawSnake(this.snake);
  },

  drawFood: function() {
    food = generateRandomPosition(numberOfCols, numberOfRows);
    return drawFood(food);
  },

  moveSnake: function() {
    let oldHead = this.snake.getHead();
    let oldTail = this.snake.move();
    let head = this.snake.getHead();
    paintBody(oldHead);
    unpaintSnake(oldTail);
    paintHead(head);
  },

  consumeFood: function() {
    let head = this.snake.getHead();
    if (head.isSameCoordAs(food)) {
      this.snake.grow();
      this.drawFood(food);
    }
  },

  isSnakeEatsItself: function() {
    return this.snake.isSnakeEatsItself();
  },

  isSnakeEncountersAtBorder: function() {
    return this.isSnakeAtToVerticalBorder() || this.isSnakeAtToHorizontalBorder();
  },

  isSnakeAtToVerticalBorder: function() {
    let headPos = game.snake.getHead();
    return headPos.x == 0 || headPos.x == this.numberOfCols - 1;
  },

  isSnakeAtToHorizontalBorder: function() {
    let headPos = game.snake.getHead();
    return headPos.y == 0 || headPos.y == this.numberOfRows - 1;
  }

}
