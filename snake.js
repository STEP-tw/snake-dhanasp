const actions={};

actions.east=(x,y)=>[x+1,y];
actions.west=(x,y)=>[x-1,y];
actions.north=(x,y)=>[x,y-1];
actions.south=(x,y)=>[x,y+1];

const getNextCoordinate=function(coord,direction) {
  let x=coord[0];
  let y=coord[1];
  return actions[direction](x,y);
}
const Snake=function(initPos,length,direction) {
  this.positions=[[12,10],[11,10],[10,10]].reverse();
  this.direction="east";
}

Snake.prototype={
  getPositions:function() {
    return this.positions;
  },
  getHead:function() {
    return this.positions.slice(-1)[0];
  },
  move:function() {
    let newHead=getNextCoordinate(this.getHead(),this.direction);
    this.positions.push(newHead);
    return this.positions.shift();
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
let numberOfRows=48;
let numberOfCols=80;

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

const drawSnake=function(snake) {
  snake.getPositions().forEach(function(pos){
    let id=pos.join("_");
    let cell=document.getElementById(id);
    cell.className="snake";
  });
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

const paintCell=function(coord,color) {
  let cell=document.getElementById(coord.join("_"));
  cell.className=color;
}

const paintSnake=function(coord) {
  paintCell(coord,"snake");
}

const unpaintSnake=function(coord) {
  paintCell(coord,"");
}

const animateSnake=function() {
  let oldTail=snake.move();
  unpaintSnake(oldTail);
  let head=snake.getHead();
  paintSnake(head);
}

const changeSnakeDirection=function(event) {
  if(event.code=="KeyA") {
    snake.turnLeft();
  } else if(event.code=="KeyD") {
    snake.turnRight();
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const startGame=function() {
  snake=new Snake();
  drawGrids();
  drawSnake(snake);
  addKeyListener();
  setInterval(animateSnake,140);
}

window.onload=startGame;
