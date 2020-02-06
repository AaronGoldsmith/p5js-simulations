import p5, { Vector, Color } from "p5";

type direction = 0 | 1 | 2 | 3;

class Walker2 {
  loc: Vector
  locs: ([Vector] | [])
  color: Color
  avoid: Number

  /** 
  *  @param {p5.Color} color the provided pigment
  */
  constructor(color: Color) {
    let startX = tileSize * (Math.floor((boardSize.x / tileSize) / 2));
    let startY = tileSize * (Math.floor((boardSize.y / tileSize) / 2));
    this.loc = p5.prototype.createVector(startX, startY);
    this.color = color;
    // this.locs = [];
    this.avoid = 0;
  }

  /** 
   *  Provide the function with a direction integer
  * @param {direction} n the step direction 
   */
  getStep(n: direction) {
    let position = this.loc.copy();
    switch (n) {
      case (0): return position.add(tileSize, 0); // right
      case (1): return position.add(-tileSize, 0); // left
      case (2): return position.add(0, -tileSize); // up
      case (3): return position.add(0, tileSize); // down
      default: return null;
    }
  };

  /**  Attempts to return the next valid/adjacent location,
  * otherwise increments an "avoid" count and returns false
  * */
  selectNextStep = function () {
    let dir = p5.prototype.floor(p5.prototype.random(4));
    let nextStep = this.getStep(dir);
    if (nextStep.onBoard(boardSize.x, boardSize.y, tileSize)) {
      for (let i = 0; i < this.locs.length; i++) {
        if (this.locs[i].x === nextStep.x &&
          this.locs[i].y === nextStep.y) {
          this.avoid++;
          return false;
        }
      }
      this.avoid = 0;
      return nextStep;
    }
    return false;
  };

  reset = function () {
    let startX = tileSize * (Math.floor((boardSize.x / tileSize) / 2));
    let startY = tileSize * (Math.floor((boardSize.y / tileSize) / 2));
    this.loc = p5.prototype.createVector(startX, startY);
    this.locs = [];
  };

  walk = function () {
    let checkStep = this.selectNextStep();
    if (checkStep) {
      this.locs.push(checkStep);
      this.loc.set(checkStep);
      this.showStep();
    }
    else if (this.avoid > threshold) {
      // will remove tolerance -1 elements from the array
      // eg) tolerance = 3: [ 1 2 3 4 5 6] -> [1 2 x x x 6] --> [1 2 6] 
      // eg) tolerance = 1: [ 1 2 3 4 5 6] -> [1 2 3 4 x 6]  --> [1 2 3 4 6]
      this.locs.splice(this.locs.length - tolerance, tolerance - 1);
    }
  };

  showStep = function () {
    p5.prototype.push();
    p5.prototype.noStroke();
    p5.prototype.fill(this.color);
    p5.prototype.translate(this.loc.x, this.loc.y);
    p5.prototype.rect(0, 0, tileSize, tileSize);
    p5.prototype.pop();
  };
}
