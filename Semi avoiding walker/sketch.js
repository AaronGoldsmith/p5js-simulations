//todo: add blend effect 

let boardSize, tileSize, tolerance, threshold;
let walkers
let colorTable;

let threshSlider, toleranceSlider, tileSizeSlider;
let threshVal, toleranceVal;


function setup() {
  // defaults
  tolerance = 8;
  threshold = 4;
  initDefaults();

  createCanvas(boardSize.x, boardSize.y - tileSize);
  setupDOM(); 
}


function draw() {
  for (let walker of walkers) {
    walker.walk();
  }
}

function restartSim() {
  initDefaults();
  clear()
  for (let walker of walkers) {
    walker.reset();
  }
}