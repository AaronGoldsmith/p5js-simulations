let margin = 20;

function Actor(id) {
  let rx = random(margin, width - margin);
  let ry = random(margin, height - margin);

  this.id = id
  this.infected = id===0;
  this.color = '#C3DAAB';
  this.infect = function(){
    this.infected = true;
    this.color = 'red'
  }
  if(this.infected){
    this.infect()
  }

  this.collision = this.crashing = false;
  this.pos = createVector(rx, ry);
  this.nexpos = createVector(0, 0);
  this.vel = p5.Vector.random2D();
  this.desired = createVector(0,0);
  this.acc = createVector(0, 0);

  this.applyForce = function(force) {
    this.acc.add(force);
  }


  this.update = function() {
    if (!this.collision) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    } else if (!this.crashing) {      // hitting wall
      this.vel = p5.Vector.random2D();
    }
    if(this.crashing){
      // this.infect()
    }
  }

  this.checkCollisions = function(hotzone) {
    let P = this.pos.copy()
    let norm = this.vel.copy().normalize().mult(18);
    this.nexpos = P.add(this.vel).add(norm);
    if (this.nexpos.x < margin || this.nexpos.x > width ||
      this.nexpos.y < margin || this.nexpos.y > height - margin) {
      this.collision = true;
    } else {
      this.collision = false;
    }
    
    if (this.crashing) {
      this.vel.setMag(0.3);
    } else {
      this.vel.setMag(1);
    }
    // one or more objects that close to (position)
    let close = hotzone.filter(
      hz => this.pos !== hz && (dist(this.nexpos.x, this.nexpos.y,
        hz.x, hz.y) < margin))
  
    if(close.length>0){
         this.crashing = true;
         let separate = p5.Vector.sub(close[0], this.pos);
         let diff = p5.Vector.sub(separate, this.vel);
         stroke(0);
         diff.limit(0.3).mult(-1)
         this.applyForce(diff);
    }
    return close.length>0 ? close : false

  }



  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + HALF_PI);
    
    fill(this.color);
    // noFill();
    // push()
    // triangle(-8, -5, 8, -5, 0, -18);
    // pop()

    // draw eyes
    push()
    fill(255);
    translate(-3.5, -9);
    ellipse(0, 0, 4)
    translate(7, 0);
    ellipse(0, 0, 4)
    pop()
    fill(this.color);
    ellipse(0, 0, 15, 19);
    noFill();
    // bezier(55, 10, 10, 10, 90, 30, 15, 40);

    pop();
  }

}