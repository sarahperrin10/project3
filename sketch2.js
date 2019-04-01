var zoom = 1.00;
 
function setup() {
  createCanvas(500,500);
  rectMode(CENTER);
}
function draw() {
  background(237, 34, 93);
  translate(width/2,height/2);
  fill(0);
  scale(zoom);
  rect(0, 0, 50, 50);
  zoom += 0.01
}