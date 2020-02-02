let GRAV = 0.09;
function Basketball(){
  let rx = random(2,3)
  let ry = Math.pow(rx,2);

  this.pos = createVector(random(20),height-20);
  this.vel = createVector(rx,-1*ry);
  // this.vel = createVector(0,0)
  this.targetVel = createVector(random(width/2),0)
  this.G = createVector(0, GRAV);
  this.tossing = false;
  this.score = 0;
  this.fitness = 0;
  this.brain = new NeuralNetwork(6, 8, 1);

  this.applyForce = function(F){
    this.vel.add(F);
  }
  this.toss = function(){
     this.score++
     this.vel.add(this.G)
     this.pos.add(this.vel);
  }

  this.think = function(target) {
    // locate the hoop
    let inputs = [];
    inputs[0] = this.targetVel.y / 10;
    inputs[1] = target.pos.y / height;
    inputs[2] = this.pos.x / width;
    inputs[3] = target.pos.x / width;
    inputs[4] = this.targetVel.x / 10; // may need to adjust
    inputs[5] = timeLeft / 1500;

    let output = this.brain.predict(inputs);
    //if (output[0] > output[1] && this.velocity >= 0) {
    if (output[0] > output[1]) {
      console.log('test')
      // if(!this.tossing){ 
        this.applyForce(this.targetVel) 
        // this.tossing = true;
        this.toss();
      // }
   
    }
  }
  this.mutate = function() {
    this.brain.mutate(0.1);
  }
  this.update = function(){
      this.score += 0.01;
      // let dy = p5.Vector.random2D().normalize()
      let vel = createVector(0, 0);
      this.targetVel.add(vel)
  }
  this.offScreen = function() {
    return this.y > height || this.y < 0 || this.x < 0 || this.x > width
  }

  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    fill("#B34226")
    ellipse(0, 0, 20)
    pop();
  }

}