let bballs, hoop;
let savedBalls = [];

let counter = 0;
let timer;
const TOTAL = 20;

let slider;
let timeLeft = 150;
function setup() { 
  createCanvas(400, windowHeight-120);
  bballs = [];
  hoop = new Hoop();
  for(let i = 0;i< TOTAL;i++){
    bballs[i] = new Basketball();
  }
  timer = createP();
} 

function draw() { 
  background(220);
  timer.html(timeLeft);
  // draw hoop before basket for backmost layer
  hoop.show();

  for(let ball of bballs ){
    ball.think(hoop);
    ball.update();
  }
  for(let i = bballs.length -1; i >= 0; i--){
    if(bballs[i].pos.y <= 20){
      bballs.splice(i,1)[0]
    }
  }



  if(timeLeft-- < 0){
    for(let ball of bballs){
      ball.toss();
      ball.applyForce(ball.targetVel) 

    }
    
  }



  // not really neccesary but shows the front of the rim infront of the ball
  hoop.drawRim();

  for (let i = bballs.length - 1; i >= 0; i--) {
    if (bballs[i].offScreen()) {
      savedBalls.push(bballs.splice(i, 1)[0]);
    }
  }
  
  if (bballs.length === 0) {
    timeLeft = 150;
    counter = 0;
    nextGeneration();
    hoop = new Hoop();
  }

  for (let ball of bballs) {
    ball.show();
  }

  
}

function mouseDragged() {
  hoop.checkUpdatePos(mouseX,mouseY);
  return false; // prevent default
}

// function Basketball(){
//   this.pos = createVector(random(20),height-20);
//   let rx = random(2,3)
//   let ry = Math.pow(rx,2);
//   this.vel = createVector(rx,-1*ry);
//   this.G = createVector(0,0.09)

//   this.applyForce = function(F){
//     this.vel.add(F);
//   }

//   this.update = function(){
//      this.vel.add(this.G)
//      this.pos.add(this.vel);
//   }

//   this.show = function(){
//     push();
//     translate(this.pos.x, this.pos.y);
//     fill("#B34226")
//     ellipse(0, 0, 20)
//     pop();
//   }

// }

function Hoop(cords){
  this.pos = cords || createVector(random(20,width-20), height/2)

  this.show = function(){
    push()
    translate(this.pos.x, this.pos.y);
    // noStroke()
    stroke(200)
    strokeWeight(1)
    // draw backboard
    fill(color("rgba(255,255,255,0.9)"))
    rect(-30,-40,60,42)
    stroke("#BD4628")
    noFill()

    // draw rim (back)
    strokeWeight(1.5)
    ellipse(0,0,32,5)
    strokeWeight(0.8)
    
    // draw net
    stroke(color('rgba(100,100,100,0.8)'))
    for(let i = 0;i< 14;i++){
      translate(0,1.4)
      if(i>1){ ellipse(0,0,32-(i*0.9),5) }
      else{
        ellipse(0,0,32,5)
      }
    }
    pop()
  }

  this.drawRim = function(){
    push()
      strokeWeight(1.5)
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke("#BD4628")
      arc(0,0,32,5,0, PI, OPEN)
    pop()
  }

  this.checkUpdatePos = function(x,y){
    if(dist(this.pos.x, this.pos.y, x, y) < 40){
      this.pos = createVector(x,y)
    }
  }

}