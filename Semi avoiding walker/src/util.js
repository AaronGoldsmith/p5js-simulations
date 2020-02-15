p5.Vector.prototype.onBoard = function (w, h, size) {
  let margin = (size / 8);
  let horizontal = this.x >= -margin && this.x <= w - margin
  let vertical = this.y >= 0 && this.y <= h
  return (horizontal && vertical)
}

const updateInputLabel = (inputSrc, label) => {
  let val = inputSrc.value();
  label.html(val)
  return val
}

// call functions to update respective label and return new values
const updateThreshold = () => threshold =  updateInputLabel( threshSlider, threshVal )
const updateTolerance = () => tolerance = updateInputLabel( toleranceSlider, toleranceVal )
const updateTileSize = () =>  tileSize = updateInputLabel( tileSizeSlider, tileSizeVal )



function setupDOM() {
  let wrapper = createDiv().class('wrapper')
  let container1 = createDiv().class('c1').parent(wrapper)
  let container2 = createDiv().class('c2').parent(wrapper)
  let container3 = createDiv().class('c3').parent(wrapper)
  let container4 = createDiv().class('c4')

  let buttons = createDiv().class('buttonWrapper')


  createSpan('Tolerance: ').parent(container1)
  toleranceVal = createSpan(tolerance)
  toleranceVal.class('bold').parent(container1)
  createP().parent(container1)
  toleranceSlider = createSlider(1, 50, 8)
  toleranceSlider.input(updateTolerance)
  toleranceSlider.parent(container1);
  createP()

  createSpan('Max Collisions: ').parent(container2)
  threshVal = createSpan(threshold).parent(container2);
  threshVal.class('bold')


  createP().parent(container2);
  threshSlider = createSlider(1, 50, 3).parent(container2)
  threshSlider.input(updateThreshold);
  createP()

  createSpan('Tile Size: ').parent(container3)
  tileSizeVal = createSpan(floor(tileSize)).parent(container3)
  tileSizeVal.class('bold').id('tile_size')

  
  
  createP().parent(container3);
  tileSizeSlider = createSlider(1, 50, 3).parent(container3)
  tileSizeSlider.input(updateTileSize);
  createP()

  clockVal = createP().parent(container4);
  clockVal.html(`Time elapsed:` )

  let restart = createButton('Restart').parent(buttons)
  restart.class('button')
  restart.mousePressed(restartSim)

  let save = createButton('Save Canvas').parent(buttons)
  let dateTime = new Date().toDateString()
  save.class('button')
  save.mousePressed(() => saveCanvas('walker-' + String(dateTime)))
  background(color('rgba(0,0,0,0.02)'))

}


function initDefaults() {
  boardSize = createVector(windowWidth - 20, windowHeight - 20)
  tileSize = tileSize || boardSize.x / 400;
  const config = {
    melt: true,
    color: undefined
  }

  clock = 0

  walkers = []

  const customColors = {
    brown: color('rgba(112, 79, 33,0.06)'),
    blue: color('rgba(0,0,200,0.06)'),
    green: color('rgba(0,180,0,0.06)'),
    red: color('rgba(200,0,0,0.06)'),
    yellow: color("rgba(200,200,0,0.008)"),
    custom:  color('rgba(220,180,180,0.008)')

  }  
  const {
    blue,
    red,
    green,
    custom,
    brown,
    yellow
  } = customColors;


  let configs = [
    {...config, color: red, collisionColor: yellow},
    {...config, color: blue, collisionColor: custom},
    {...config, color: green},
    {...config, color: red, collisionColor: yellow},
    // {...config, color: blue},
    // {...config, color: red},
    // {...config, color: blue},
    // {...config, color: green}
  ]

  walkers = configs.map(data => new Walker(data));
}

function getTotalSec(clock){
  return floor(clock/60)
}
function getTotalMin(seconds){
  return floor(seconds/60)
}
function getTotalHours(minutes){
  return floor(minutes/60)
}

/**
  *  Creates an instance of a _{c}_
  *  colored tile at (x,y)
  * @param {int} x - x-cordinate
  * @param {int} y - y-cordinate
  * @param {p5.Color} [c]
*/
class Tile {
  constructor(x, y, c = random(255)) {
    this.loc = createVector(x, y);
    this.color = c;
    this.draw = function () {
      noStroke();
      push();
      fill(this.color);
      translate(this.loc.x, this.loc.y);
      rect(0, 0, 10, 10);
      pop();
    };
  }
}

function drawGrid(tiles) {
  tiles.forEach(tile => tile.draw())
}

function addTiles() {
  let tiles = [];
  for (let i = 0; i < boardSize.x; i += tileSize) {
    for (let j = 0; j < boardSize.y; j += tileSize) {
      let col = color(0, 200, random(200))
      tiles.push(new Tile(i, j, col))
    }
  }
  return tiles;
}