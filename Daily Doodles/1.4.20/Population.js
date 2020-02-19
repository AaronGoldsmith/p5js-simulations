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
         let pos = this.hotzone[0].copy();
          current.setRed();
         let _pos = createVector(random(width),random(height))
         current.seek(_pos);
       }
      else{ this.actors[j].crashing = false;}
        // this.actors[j].discover(this.hotzone, this.popsize)
      
     }
  }
}