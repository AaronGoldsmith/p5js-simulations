let population;
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  population = new Population();
}

function draw() {
  background(220);
    population.checkCollisions();
    population.show();
}