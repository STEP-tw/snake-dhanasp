const _directions=["north","east","south","west","north"];

const Position=function(x,y,direction) {
  this.x=x;
  this.y=y;
  this.direction=direction;
}

const actions={};

actions.east=(x,y)=>[x+1,y];
actions.west=(x,y)=>[x-1,y];
actions.north=(x,y)=>[x,y-1];
actions.south=(x,y)=>[x,y+1];

Position.prototype.next=function() {
  let nextCoord=actions[this.direction](this.x,this.y);
  return new Position(nextCoord[0],nextCoord[1],this.direction);
}

Position.prototype.turnLeft=function() {
  let currentIndex=_directions.lastIndexOf(this.direction);
  let newDirection=_directions[currentIndex-1];
  return new Position(this.x,this.y,newDirection);
}

Position.prototype.turnRight=function() {
  let currentIndex=_directions.indexOf(this.direction);
  let newDirection=_directions[currentIndex+1];
  return new Position(this.x,this.y,newDirection);
}

Position.prototype.getCoord=function() {
  return [this.x,this.y];
}

const Snake=function(head,body) {
  this.head=head;
  this.body=body;
}

Snake.prototype={
  getBody:function() {
    return this.body;
  },
  getHead:function() {
    return this.head;
  },
  move:function() {
    let newHead=getNextCoordinate(this.getHead(),this.direction);
    this.positions.push(newHead);
    return this.positions.shift();
  },
  grow:function() {
    this.positions.unshift(["hidden","tail"]);
  },
  turnLeft:function() {
    let directions=["north","east","south","west","north"];
    let currentIndex=directions.lastIndexOf(this.direction);
    this.direction=directions[currentIndex-1];
  },
  turnRight:function() {
    let directions=["north","east","south","west","north"];
    let currentIndex=directions.indexOf(this.direction);
    this.direction=directions[currentIndex+1];
  },
  containsPosition:function(head) {
    return this.positions.slice(0,-1).some(function(position){
      return head[0]==position[0] && (head[1]==position[1]);
    });
  }
}
// Controller and View below
// Model above
//

let snake=undefined;
let numberOfRows=60;
let numberOfCols=120;

const drawGrids=function() {
  let grid=document.getElementById("grid");
  for (var i = 0; i < numberOfRows; i++) {
    let row=document.createElement("tr");
    for (var j = 0; j < numberOfCols; j++) {
      let col=document.createElement("td");
      col.id=`${j}_${i}`;
      row.appendChild(col);
    }
    grid.appendChild(row);
  }
}

const paintCell=function(pos,color) {
  let cell=document.getElementById(pos.getCoord().join("_"));
  if(cell)
    cell.className=color;
}

const paintBody=function(pos) {
  paintCell(pos,"snake");
}

const paintHead=function(pos) {
  paintCell(pos,"snake_head");
}

const unpaintSnake=function(pos) {
  paintCell(pos,"");
}

const drawSnake=function(snake) {
  snake.getBody().forEach(function(pos){
    paintBody(pos);
  });
  paintHead(snake.getHead());
}

const isOutOfBounds=function(coord) {
  let x=coord[0];
  let y=coord[1];
  return x<0 || x>=numberOfCols || y<0 || y>=numberOfRows;
}

const detectCollisions=function(snake) {
  let head=snake.getHead();
  if(isOutOfBounds(head) || snake.containsPosition(head)) {
    alert("collision");
  }
}


const animateSnake=function() {
  let oldTail=snake.move();
  unpaintSnake(oldTail);
  let head=snake.getHead();
  paintSnake(head);
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const startGame=function() {
  createSnake();
  drawGrids();
  drawSnake(snake);
  // addKeyListener();
  // setInterval(animateSnake,140);
}

window.onload=startGame;
