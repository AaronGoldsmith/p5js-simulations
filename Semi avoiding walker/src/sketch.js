//todo: add blend effect 

let boardSize, tileSize, tolerance, threshold;
let clock;
let walkers
let colorTable;
let test;
let threshSlider, toleranceSlider, tileSizeSlider;
let threshVal, toleranceVal, clockVal;
p5.Vector.prototype.toString = function () {
  return `{${this.x},${this.y}}`
}
let timer;
function preload(){
  initDefaults()
}
function setup() {
  // defaults

  tolerance = 4;
  threshold = 8;
  test = 2;

  createCanvas(boardSize.x, boardSize.y - tileSize);
  setupDOM();

}

// Work in progress:

// function addDrip() {
//   let dripOrder = [1, 1.25, 3, 4.5, 5, 6.5, 7, 9]
//   let drips = []
//   let start = floor(random(3));
//   let c = color('rgba(250,0,0,0.06)')
//   fill(c)
//   noStroke();
//   // create consentric rings
//   for (let ring = 1; ring < 9; ring += abs(randomGaussian(2.5, 1))) {
//     walkers[0].getSurroundingNeighbors(ring, tileSize)
//               .forEach(p => rect(p.x, p.y, tileSize, tileSize))
//   }

 
// }
//   function mouseReleased() {
//     if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
//       // addDrip();
//     }
//   }


  function getUpdatedTime(){
     msElapsed = ++clock;   

    let seconds = getTotalSec(msElapsed)
    let minutes = getTotalMin(seconds)
    let hours = getTotalHours(minutes);
    let min = minutes%60 > 0 ? `${minutes%60}min` : ''
    if(minutes)
      if(minutes >= 60)  
        return `${hours}hr ${min} ${seconds%60}s`
      else
        return `${min} ${seconds%60}s`
    return `${seconds%60}s`
  }

  function draw() {
    for (let walker of walkers) {
      walker.walk();
    }
    clockVal.html(`Time elapsed: ${getUpdatedTime()} `)

  }

  function restartSim() {
    initDefaults();
    clear()
    for (let walker of walkers) {
      walker.reset();
    }
  }