
function Walker(color){
  let startX = tileSize * (Math.floor((boardSize.x/tileSize)/2));
  let startY = tileSize * (Math.floor((boardSize.y/tileSize)/2));

  this.loc = createVector(startX,startY);
  this.color = color;
  this.locs = [];
  this.avoid = 0;
  
  this.getStep = function(n){
    let position = this.loc.copy();
    switch(n){
       case(0): return position.add( tileSize, 0); // right
       case(1): return position.add( -tileSize, 0); // left
       case(2): return position.add( 0, -tileSize); // up
       case(3): return position.add( 0, tileSize); // down
       default: return null;
    }
  }

/**
  * Tries to find the next valid/adjacent location,
  * otherwise increments its "avoid" count
  *
  * @returns {(p5.Vector|boolean)} 
*/
  this.selectNextStep = function() {

    let dir = Math.floor(random(4))
    let nextStep = this.getStep(dir);
    if(nextStep.onBoard(boardSize.x, boardSize.y, tileSize)){
      for(let i = 0; i< this.locs.length; i++){
         if(this.locs[i].x === nextStep.x &&
            this.locs[i].y === nextStep.y){
              this.avoid++;  // increment the avoid count by one

              return false;  
         }
      }



      this.avoid = 0;
      return nextStep;
    }
    return false;
  }
  
  this.reset = function(){
    let startX = tileSize * (Math.floor((boardSize.x/tileSize)/2));
    let startY = tileSize * (Math.floor((boardSize.y/tileSize)/2));

    this.loc = createVector(startX,startY);
    this.locs = [];
    
  }
  this.walk = function(){
    let checkStep = this.selectNextStep();
    if(checkStep){
      this.locs.push(checkStep)
      this.loc.set(checkStep);
    }
    else if(this.avoid > threshold){
      this.locs.splice(this.locs.length-tolerance, tolerance-1);
    }
  }
  
  
  this.show = function(){
    push()
    noStroke()
    fill(this.color)
    translate(this.loc.x, this.loc.y)
    rect(0,0, tileSize, tileSize);
    pop()
  }
  
}