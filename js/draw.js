let ctx = document.querySelector("#canvas").getContext("2d");
ctx.strokeStyle = "#0A3871";
ctx.lineWidth = 7;
ctx.lineCap = "round";

let width = ctx.canvas.width;
let height = ctx.canvas.height;

function drawLine(fromX, fromY, toX, toY) {
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
}

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawHanger() {
  drawLine(5, 345, 345, 345);
  drawLine(65, 345, 65, 5);
  drawLine(65, 80, 145, 5);
  drawLine(65, 5, 280, 5);
  drawLine(280, 5, 280, 70);
}
