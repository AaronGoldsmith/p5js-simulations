

class Walker {
  /**
    * @param {Color} color */

  constructor(props) {
    let startX = tileSize * (Math.floor((boardSize.x / tileSize) / 2));
    let startY = tileSize * (Math.floor((boardSize.y / tileSize) / 2));
    this.loc = createVector(startX, startY);
    this.start = false;
    this.color = props.color;
    this.collisionColor = props.collisionColor ? props.collisionColor : color('rgba(0,0,20,0.008)');
    this.locs = [];
    this.rgba = [props.color.get]
    this.avoidCount = 0;

    /** * @param {Number} n the step direction  */
    this.getStep = function (n) {
      let position = this.loc.copy();
      switch (n) {
        case (0): return position.add(tileSize, 0); // East
        case (1): return position.add(-tileSize, 0); // West
        case (2): return position.add(0, -tileSize); // North
        case (3): return position.add(0, tileSize); // Sourth
        case (4): return position.add(-tileSize, tileSize); // SW
        case (5): return position.add(-tileSize, -tileSize); // NW
        case (6): return position.add(tileSize, tileSize); // NE
        case (7): return position.add(tileSize, -tileSize); // SE
        default: return null;
      }
    };



    this.getSurroundingNeighbors = function (r) {
      let neighbors = []
      let v1 = this.loc.copy();
      let _v1c = v1.add(createVector(tileSize / 2, tileSize / 2))
      const length = tileSize * r;


      for (let nx = this.loc.x - length; nx < this.loc.x + length; nx += (tileSize+0.2)) {
        for (let ny = this.loc.y - length; ny < this.loc.y + length; ny += (tileSize+0.35)) {
          let v2 = createVector(nx, ny)
          let _v2c = v2.copy().add(createVector(tileSize / 2, tileSize / 2))
          // let tS = tileSize / 2
          // line(_v1c.x, _v1c.y, _v2c.x, _v2c.y)
          let inRange = dist(_v1c.x, _v1c.y, _v2c.x, _v2c.y);
          if (inRange <= (r * tileSize) + tileSize && inRange > tileSize / 4) neighbors.push(createVector(nx, ny))
        }
      }
      return neighbors;
    }


    /**  Attempts to return the next valid/adjacent location,
    * otherwise increments an "avoid" count and returns false
    * */
    this.selectNextStep = function () {
      let dir = Math.floor(random(8));
      let nextStep = this.getStep(dir);
      if (nextStep && nextStep.onBoard(boardSize.x, boardSize.y, tileSize)) {
        for (let i = 0; i < this.locs.length; i++) {
          if (this.locs[i].x === nextStep.x &&
            this.locs[i].y === nextStep.y) {
            this.avoidCount++;
            return false;
          }
        }
        this.avoidCount = 0;
        return nextStep;
      }
      return false;
    };

    this.reset = function () {
      let startX = tileSize * (Math.floor((boardSize.x / tileSize) / 2));
      let startY = tileSize * (Math.floor((boardSize.y / tileSize) / 2));
      this.loc = createVector(startX, startY);
      this.locs = [];
    };



    this.paintSurroundingNeighbors = function () {
      this.getSurroundingNeighbors(3).forEach(tile => {
        push()
        noStroke();
        translate(tile.x, tile.y)
        fill(this.collisionColor)
        rect(0, 0, tileSize, tileSize)
        pop()
      })
    }
    this.showStep = function () {
      push();
      noStroke();
      strokeWeight(0.1)
      fill(this.color);
      translate(this.loc.x, this.loc.y);
      rect(0, 0, tileSize, tileSize);
      pop();
    };
  }
  walk = () => {
    let checkStep = this.selectNextStep();
    if (checkStep) {
      this.locs.push(checkStep);
      this.loc.set(checkStep);
      this.showStep()
    }
    else if (this.avoidCount > threshold) {
      this.paintSurroundingNeighbors();

      // will remove tolerance -1 elements from the array
      // eg) tolerance = 3: [ 1 2 3 4 5 6] -> [1 2 x x x 6] --> [1 2 6] 
      // eg) tolerance = 1: [ 1 2 3 4 5 6] -> [1 2 3 4 x 6]  --> [1 2 3 4 6]
      this.locs.splice(this.locs.length - (1 + tolerance), tolerance);
    }


  };
}
