const canvas = document.getElementById("my-canvas");

canvas.width = 800;
canvas.height = 500;

const ctx = canvas.getContext("2d");
const leftKey = 37;
const rightKey = 39;

//Paddle
const rect = {
	x:300,
	y:400,
	width: 80,
	height: 20
	
  }

//make list of rectangles
let grid = [ ]
for(let i = 0;i < 3; i++){
	let row = [ ]
	grid.push(row)
	for(let j = 0;j < 5; j++){
		row.push({
			x: j*150 + 20,
			y: (i*50)+50,
			width: 130,
			height: 30,
			color: "lightblue",
			status: true
		})

	}
}

console.log(grid)

//print this list to be a grid
const drawonerect = (obj) =>{
	if(obj.status == true){
		ctx.fillStyle = obj.color
		ctx.fillRect(obj.x,obj.y,obj.width, obj.height);
	}
}

const drawallrects = (grid) =>{
	// console.log("grid",grid)
	for (row in grid){
		// console.log("row",row)
		for (brick in grid[row]){
			// console.log("brick",grid[row][brick])
			drawonerect(grid[row][brick])
		}
	}
}

// drawonerect(grid[0])
let lifecount = 3
const drawP = (obj) =>{
	ctx.fillStyle ="hotpink"
	ctx.fillRect(obj.x,obj.y,obj.width, obj.height) 
   }

//conditional for ball and rects
const checkpb = (paddle) =>{
	if(dy > 0){
		if(y >= paddle.y && x >=paddle.x && x <= paddle.x +paddle.width){
			dy = -dy
		}
	}
	if(y > paddle.y){
		lifecount-=1
		y = 10
		console.log(lifecount)
	}
 }

const onerect = (object) =>{
	if(x >= object.x && x <= object.x+object.width){
		if(y >= object.y && y<= object.y+object.height){
			object.status = false
		}
 }
}
const allrects = (grid) =>{
	for (row in grid){
		for (brick in grid[row]){
			onerect(grid[row][brick])
		}
	}

}

//event listener
document.addEventListener("keydown", (e) => {
	if(e.keyCode == 65){
		
		console.log("left")
		rect.x = rect.x - 10
	}
  
	if(e.keyCode == 68){
		console.log("right")
    rect.x = rect.x + 10	
	}
})


var x = canvas.width - 40
var y = canvas.height - 40

// radius
var size = 15;

// direction/speed
var dx = 1; 
var dy = -3;

// Draw the ball
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI*2, false);
  ctx.fillStyle = "dark pink";
  ctx.fill();
  ctx.closePath();
}

const moveB = () => {
//   ctx.clearRect(0,0, canvas.width, canvas.height);
  drawBall();
  if (y + dy < 0){
    // bounces up instead
    dy = -dy;
  }
  if(y + dy > canvas.height - size){
    //bounces down instead (but slower)
    dy = -dy * 1; 
    //bounce horizontally (but slower)
    dx = dx * 1; 
  }
  //left or the right
  if (x + dx > canvas.width - size || x + dx < size){
    //bounces in the opposite direction
    dx = -dx * 1; 
  }
	// Move the ball
  x += dx;
  y += dy;
}

const game = () => {
	ctx.clearRect(0,0, canvas.width, canvas.height)
	drawP(rect)
	moveB()
	drawallrects(grid)
	checkpb(rect)
	allrects(grid)
 	


}


setInterval(game, 10);




function printToScreen(text) {
	let r = Math.floor(Math.floor(Math.random() * 155 + 1));
	let g = Math.floor(Math.floor(Math.random() * 155 + 1));
	let b = Math.floor(Math.floor(Math.random() * 155 + 1));
	const svg = d3
	  .select("body")
	  .append("svg")
	  .attr("width", 1500)
	  .attr("height", 75);
  
	svg
	  .append("text")
	  .attr("y", 37.5)
	  .attr("width", 450)
	  .attr("height", 75)
	  .attr("x", -1000)
	  .attr("font-weight", "bold")
	  .attr("font-size", "20px")
	  .attr("fill", `rgb(${r},${g},${b}`)
	  .attr("font-family", "Roboto")
	  .text(text)
	  .transition()
	  .duration(1000)
	  .attr("x", 37.5);
  }
