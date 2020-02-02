let ball,img, team,team2;
const margin = 20;
function preload() {
  img = loadImage('images/soccer.png');
}
function setup() { 
  let min = Math.min(windowWidth, 900);
  createCanvas(min, 400);

  ball = new Ball();
  team = new Team(1);
  team2 = new Team(2);
} 

function draw() { 
  background('green');
  ball.update();
  ball.show();

  push()
  translate(-10.5,-10.5)
  image(img,ball.pos.x,ball.pos.y,21,21);
  pop()

  team.run(ball);
  team2.run(ball);

  if(keyIsDown(LEFT_ARROW)){
    ball.pos.x -= 2;
  }
  if(keyIsDown(RIGHT_ARROW)){
    ball.pos.x += 2;
  }
  if(keyIsDown(UP_ARROW)){
    ball.pos.y -= 2
  }
  if(keyIsDown(DOWN_ARROW)){
    ball.pos.y += 2
  }
}


function Ball(){
  this.pos = createVector(width/2, height/2)
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);

  this.show = function(){
    push()
    translate(this.pos.x, this.pos.y)
    fill('#fff')
    strokeWeight(2);
    ellipse(0,0, 20)
    strokeWeight(1)
    pop();
  }
  this.applyForce = function(force){
    this.acc.add(force);
  }
  this.update = function(){
    let posx = this.pos.x + this.vel.x
    let posy = this.pos.y + this.vel.y

     if(posx < 5 || posx > width-5 || posy < 5 || posy > height-5){
      this.vel.rotate(180)
      this.vel.limit(1)
     }
    this.vel.add(this.acc).limit(4)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }
}
