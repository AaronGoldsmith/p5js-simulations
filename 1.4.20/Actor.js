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
function Actor() {
  let rx = random(margin, width - margin);
  let ry = random(margin, height - margin);


  this.attr = {
    margin: 20
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
    } else if (!this.crashing) {
      // hitting wall
      this.vel = p5.Vector.random2D();
    }
  }

  this.checkCollisions = function(hotzone) {
    let P = this.pos.copy()
    let norm = this.vel.copy().normalize().mult(18);
    this.nexpos = P.add(this.vel).add(norm);
    if (this.nexpos.x < 4 || this.nexpos.x > width ||
      this.nexpos.y < 0 || this.nexpos.y > height - 4) {
      this.collision = true;
    } else {
      this.collision = false;
    }
    // 
    if (this.crashing) {
      this.vel.setMag(0.1);
    } else {
      this.vel.setMag(1);
    }
    // one or more objects that close to (position)
    let close = hotzone.filter(
      hz => this.pos !== hz && (dist(this.nexpos.x, this.nexpos.y,
        hz.x, hz.y) < 45))
    
    close = close.filter(
      hz => this.pos !== hz && (dist(this.nexpos.x, this.nexpos.y,
        hz.x, hz.y) > 5))
    
    if(close.length>0){
        this.crashing = true;
         let separate = p5.Vector.sub(close[0], this.pos);
         let diff = p5.Vector.sub(separate, this.vel);
         stroke(0);
        strokeWeight(2);

         diff.limit(0.3).mult(-1)
         this.applyForce(diff);
          
              line(close[0].x, close[0].y, this.nexpos.x + 10, this.nexpos.y + 10);

         strokeWeight(1);

    }
    return close.length > 0;
    // console.log(close);

  }



  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + HALF_PI);

    fill(0);
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
    fill("#C3DAAB");
    ellipse(0, 0, 15, 19);
    noFill();
    // bezier(55, 10, 10, 10, 90, 30, 15, 40);

    pop();
  }

}