let margin = 20;
function sign ( p1,  p2,  p3)
{
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function pointInTriangle ( pt,  v1,  v2,  v3)
{
    let d1, d2, d3;
    let has_neg, has_pos;

    d1 = sign(pt, v1, v2);
    d2 = sign(pt, v2, v3);
    d3 = sign(pt, v3, v1);

    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}

class Actor {
  constructor() {
    let rx = random(margin, width - margin);
    let ry = random(margin, height - margin);
    this.attr = {
      margin: 20
    };
    this.maxspeed = 3;
    this.maxforce = 0.2;
    this.collision = this.crashing = false;
    this.pos = createVector(rx, ry);
    this.nexpos = createVector(0, 0);
    this.vel = p5.Vector.random2D();
    this.desired = createVector(0, 0);
    this.acc = createVector(0, 0);


    this.applyForce = function (force) {
      this.acc.add(force);
    };
    this.setRed = function(){

      this.red = true;
      setTimeout(()=>{this.red = false},3000)
    }
    this.seek = function(target) {
      var desired = p5.Vector.sub(target, this.pos); // A vector pointing from the location to the target
  
      // Scale to maximum speed
      desired.setMag(this.maxspeed);
  
      // Steering = Desired minus velocity
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce); // Limit to maximum steering force
  
      return steer;
      //this.applyForce(steer);
    };

    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };
    this.checkCollisions = function (hotzone) {
      let P = this.pos.copy();
      let norm = this.vel.copy().normalize().mult(18);
      this.nexpos = P.add(this.vel).add(norm);
      this.boundaries();
      // one or more objects that close to (position)
      let close = hotzone.filter(hz => this.pos !== hz && (dist(this.nexpos.x, this.nexpos.y, hz.x, hz.y) < 45));
      close = close.filter(hz => this.pos !== hz && (dist(this.nexpos.x, this.nexpos.y, hz.x, hz.y) > 5));
      if (close.length > 0) {
        this.crashing = true;
        stroke(0);
        this.red = true;
        strokeWeight(1);
      }
      else{ this.red = false;}
      return close.length > 0;
      // console.log(close);
    };
    this.boundaries = function() {
      var d = 25;
  
      var desired = null;
  
      if (this.pos.x < d) {
        desired = createVector(this.maxspeed, this.vel.y);
      } else if (this.pos.x > width - d) {
        desired = createVector(-this.maxspeed, this.vel.y);
      }
  
      if (this.pos.y < d) {
        desired = createVector(this.vel.x, this.maxspeed);
      } else if (this.pos.y > height - d) {
        desired = createVector(this.vel.x, -this.maxspeed);
      }
  
      if (desired !== null) {
        desired.normalize();
        desired.mult(this.maxspeed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        this.applyForce(steer);
      }
    };
    this.show = function () {
      push();
      stroke(100);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading() + HALF_PI);
      fill(0);

      // eyes
      push();
      fill(255);
      translate(-3.5, -7);
      ellipse(0, 0, 4);
      translate(7, 0);
      ellipse(0, 0, 4);
      pop();



      for(let i = 0;i<3;i++){
        fill("#C3DAAB");

        if(i==0){
          ellipse(0, 0, 12, 14);
        }
        else if(i==2){
          if(this.red){fill('red');}
          ellipse(0, 0, 11, 14);
        }
        else{ ellipse(0, 0, 9, 14);        }
        translate(0,8)
      }
      noFill();
      // bezier(55, 10, 10, 10, 90, 30, 15, 40);
      pop();
    };
  }
}
  