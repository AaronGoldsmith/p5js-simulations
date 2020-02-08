//todo: add blend effect 

let boardSize, tileSize, tolerance, threshold;
let walkers
let colorTable;
let test;
let threshSlider, toleranceSlider, tileSizeSlider;
let threshVal, toleranceVal;

let timer;
function setup() {
  // defaults
  tolerance = 4;
  threshold = 8;
  test = 0;
  initDefaults();

  createCanvas(boardSize.x, boardSize.y - tileSize);
  setupDOM(); 

}
 

function draw() {
 

    for (let walker of walkers) {
      walker.walk();
    }
    
  

  // end test
}

function restartSim() {
  initDefaults();
  clear()
  for (let walker of walkers) {
    walker.reset();
  }
}