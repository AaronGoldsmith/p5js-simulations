p5.Vector.prototype.onBoard = function( w, h, size){
  let margin = (size/8);
  let horizontal = this.x >= -margin && this.x <= (w-size+margin)
  let vertical = this.y >= 0 && this.y <= (h-size+margin)
  return ( horizontal && vertical )  
}

function updateThreshold(){
  threshVal.html(threshSlider.value());
  threshold = threshSlider.value()

}

function updateTolerance(){
  toleranceVal.html(toleranceSlider.value());
  tolerance = toleranceSlider.value()
}
function updateTileSize(){
  tileSizeVal.html(tileSizeSlider.value());
  tileSize = tileSizeSlider.value()
}

function setupDOM(){
  let wrapper = createDiv().class('wrapper')
  let container1 = createDiv().class('c1').parent(wrapper)
  let container2 = createDiv().class('c2').parent(wrapper)
  let container3 = createDiv().class('c3').parent(wrapper)


  createSpan('Tolerance: ').parent(container1)
  toleranceVal = createSpan(tolerance)
  toleranceVal.class('bold').parent(container1)
  createP().parent(container1)
  toleranceSlider = createSlider(1,50,8)
  toleranceSlider.input(updateTolerance)
  toleranceSlider.parent(container1);
  createP()
  
  createSpan('Max Collisions: ').parent(container2)
  threshVal = createSpan(threshold)
                      .class('bold')
                       .parent(container2);
  createP().parent(container2);
  threshSlider = createSlider(1,50,3).parent(container2)
  threshSlider.input(updateThreshold);
  createP()
  
  createSpan('Tile Size: ').parent(container3)
  tileSizeVal = createSpan(floor(tileSize)).class('bold')
                                     .parent(container3);
  createP().parent(container3);
  tileSizeSlider = createSlider(1,50,3).parent(container3)
  tileSizeSlider.input(updateTileSize);
  createP()

   let button = createButton('Restart').class('restart')
   button.mousePressed(restartSim)
 
}


function initConstants() {
  boardSize = createVector(windowWidth - 20, windowHeight - 20)
    tileSize = tileSize || boardSize.x / 400;

  walkers = []

  
  customColors = {
    brown: color('rgba(112, 79, 33,0.06)'),
    blue: color('rgba(0,0,200,0.06)'),
    green: color('rgba(0,180,0,0.06)'),
    red: color('rgba(200,0,0,0.06)')
  }
  const {
    blue,
    red,
    green,
    brown
  } = customColors;
  walkers = [new Walker(blue),
    new Walker(green),
    new Walker(brown)
  ]
}

/**
  * @param {int} x - x-cordinate 
  * @param {int} y - y-cordinate
  * @param {p5.Color} [c] 
*/
function Tile(x,y,c = random(255)){
  this.loc   = createVector(x,y)
  this.color = c 
  this.draw = function(){
    noStroke()
    push()
    fill(this.color)
    translate(this.loc.x, this.loc.y);
    rect(0,0, 10,10);
    pop()
  }
}


function drawGrid(tiles){
  tiles.forEach(tile => tile.draw())
}


function addTiles(){
  let tiles = [];
  for(let i = 0;i < boardSize.x; i+=tileSize){
    for(let j = 0; j< boardSize.y; j+=tileSize){
      let col = color(0, 200, random(200))
      tiles.push(new Tile(i,j, col))
    }
  }
  return tiles;
}