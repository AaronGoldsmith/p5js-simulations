
function Player(teammates, teamNum){
  this.vel = p5.Vector.random2D().setMag(3).limit(1);
  this.acc = createVector(0,0)
  this.team = teamNum;
  this.jersey = teamNum == 1 ? "red" : "blue";

  let startingSide = teamNum == 1 ? 22 : width - 22
  this.pos = createVector(startingSide, random(margin, height-margin))

 // check if you are in the way of someone else
  this.tooClose = function(teammates){
    return teammates.some(teammate =>
             this !== teammate && 
             dist(teammate.pos.x, teammate.pos.y, this.pos.x+this.vel.x, this.pos.y+this.vel.y) < margin);
  }

  this.applyForce = function(force){
    this.acc.add(force); 
  }

  this.update = function(ball){
    let posx = this.pos.x + this.vel.x
    let posy = this.pos.y + this.vel.y

    //  if(posx < margin || posx > width-margin || posy < margin || posy > height-margin){
    //   let fx = this.vel.copy().rotate(random(90,180))
    //   let _pos = this.pos.copy();
    //   this.desiredPos = _pos.add(fx)
    //  }
     if(this.collision){
       this.vel = this.vel.copy().normalize().rotate(random(50,100));
     }
     else if(dist(this.pos.x,this.pos.y,ball.pos.x,ball.pos.y) <= 30){
      let playerVel = this.vel.copy();
      ball.applyForce(playerVel)
    }
    else if(this.desiredPos && this.pos.x != this.desiredPos.x &&
      this.pos.y != this.desiredPos.y){
      let dirVec = p5.Vector.sub(this.desiredPos, this.pos)
      let moveVec = p5.Vector.sub(dirVec, this.vel).limit(1)
      this.applyForce(moveVec)
    }
    
    if(!this.collision){
      this.vel.add(this.acc).limit(1.5);
      this.pos.add(this.vel)
    }
    this.acc.mult(0)
  }
      

  this.show = function(){
    fill(this.jersey);
    push()
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading())

    ellipse(0,0, 20)
    line(0,0,this.vel.mag()*8,0)

    pop();
  }


  this.checkCollision = function(players){
    if(this.tooClose(players)){
      this.collision = true;
    }
    else{
      this.collision = false;
    }
  }
    // correct for initial position
    if(teammates.length > 0){
      while(this.tooClose(teammates)){
        this.pos = createVector(startingSide,random(margin, height-margin))
      }
    }
  }



class Team {
  constructor(color) {
    this.players = [];
    for (let i = 0; i < 6; i++) {
      this.players[i] = new Player(this.players, color);
    }
    this.run = function (ball) {
      for (let player of this.players) {
          player.update(ball);
          player.checkCollision(this.players);
          player.desiredPos = ball.pos
          player.show();
      }
    };
  }
}
