//todo: add blend effect 

let boardSize, tileSize, tolerance, threshold;
let walkers, colorTable;

let threshSlider, toleranceSlider, tileSizeSlider;
let threshVal, toleranceVal;


function setup() {
   tolerance = 8;
  threshold = 4;
  initConstants();
   // defaults
   

  createCanvas(boardSize.x, boardSize.y - tileSize);
 
  setupDOM();
   
}


function draw() {
  for (let walker of walkers) {
    walker.walk();
    walker.show();
  }
}

function restartSim(){
  initConstants();
  clear()
   for (let walker of walkers) {
    walker.reset();
    
  }
}