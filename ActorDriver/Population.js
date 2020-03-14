function Population(){
  this.actors = [];
  this.popsize = 200;
  this.hotzone = [];
  this.infected = [];
  
  for(var i = 0; i < this.popsize; i++){
    this.actors[i] = new Actor(i);
    if(this.actors[i].infected){
      this.infected.push(this.actors[i])
    }
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
        let vel = current.vel.copy();
        vel.rotate(random(-1,1)*90).mult(2);
        if(!current.infected && 
            this.infected.some(blob => 
                dist(blob.pos.x,blob.pos.y, current.pos.x, current.pos.y)<margin)){
          current.infect();
          this.infected.push(current)
          console.log(current)
        }
       }
       else{ current.crashing = false;}
     }
  }
}