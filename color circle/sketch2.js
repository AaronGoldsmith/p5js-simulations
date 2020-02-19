
let i = 0;
function setup() {
  createCanvas(700, 400, WEBGL);
  push();
  translate(mouseX-350,mouseY-200);
  fill(237, 34, 93);
  sphere(10);
  pop();
  noCursor()

}




function draw() {
  stroke(0)
  // orbitControl();
  background(220);
  push();
  translate(mouseX-350,mouseY-200);
  rotateZ(i)
  // normalMaterial()
  // ambientMaterial(createVector(200,200,200), createVector(237, 34, 93), createVector(200,200,200), 1);
  // noFill();
  sphere(10);
  pop();

  // stroke(255);
  // push();
  // normalMaterial();
  // translate(0, 0, -10);
  // box(30, 30, 30);
  // pop();

}