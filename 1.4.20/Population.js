function Population(){
  this.actors = [];
  this.popsize = 25;
  this.hotzone = [];
  
  for(var i = 0; i < this.popsize; i++){
    this.actors[i] = new Actor();
  }
  
  this.show = function(){
    for(var i = 0;i< this.popsize; i++){
      this.actors[i].update();
      this.actors[i].show();
    }
  }
  
  this.checkCollisions = function(){
    this.hotzone = [];
     for(var i = 0;i< this.popsize; i++){
        this.hotzone[i] = this.actors[i].pos;
     }
    

    for(var j = 0;j< this.popsize; j++){
      let current = this.actors[j];
       let close = current.checkCollisions(this.hotzone);
       if(close){
         // steer away
         
         let angle = random(-1/3*PI,-2/3*PI);
         let angle2 = random(1/3*PI, 2/3*PI);
         let mid = random() < 0.5 ? angle : angle2;
         let pos = current.pos.copy();
         let vel = current.vel.copy();
         let _vel = vel.rotate(random(-1,1)*90).mult(2);
         
         // let desired = p5.Vector.sub(pos.add(_vel),this.actors[j].pos);
         // desired.setMag(2);
         // let diff = p5.Vector.sub(desired, this.actors[j].vel);
         // diff.limit(0.1);
         // this.actors[j].applyForce(diff);
         // this.actors[j].vel = _vel;
         // this.actors[j].pos.add(_vel);
         // this.actors[j].crashing = true;
       }
      else{ this.actors[j].crashing = false;}
        // this.actors[j].discover(this.hotzone, this.popsize)
      
     }
  }
}