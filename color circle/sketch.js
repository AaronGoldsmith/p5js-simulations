
var colors = [];
let e = 0;
let speed = 10;
var showindex = [0,1,2,3,4,5,7];
function drawBarrier() {
  let r = width / 3;
  // translate(width / 2, height / 2);
  fill(255)
  ellipse(0, 0, 2 * r)
  let index = 0;
  for(let i = 0; i<TWO_PI; i+= QUARTER_PI/2){
    fill(colors[index])

    stroke(colors[index])
    strokeWeight(1)
    arc(0, 0, 2*r, 2*r, 0, QUARTER_PI/2, PIE);
    if(showindex.includes(index)){
      fill(0)
      text(`${index}`, 90, 14)
    }
    rotate(QUARTER_PI/2)
    index++;
  }
}


function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  let B = random(84,100)
  let S = floor(random(65,100));
  let H = floor(random(100));
  for(let i = 0; i<20;i++){
    colors.push(color(H, S, B))
    H+=100 ;
    H = H%360;
  }
}


function mouseDragged() {
  if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
    speed =  (mouseX-pmouseX) 
  }
}



function draw() {
  stroke(0)
  background(220);
  push()
  translate(width/2,height/2)
  e+= map(speed,20,0,1,0);
  if(speed>0){
    speed -= 0.1
  }
  else{
   speed = 0;
  }
  rotate(e)
  drawBarrier()
  pop();

}