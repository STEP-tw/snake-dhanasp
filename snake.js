const Snake=function(initPos,length,direction) {
  this.positions=[[10,10],[11,10],[12,10]];
}

Snake.prototype={
  getPositions:function() {
    return this.positions;
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

const startGame=function() {
  snake=new Snake();
  drawGrids();
  drawSnake(snake);
}

window.onload=startGame;
