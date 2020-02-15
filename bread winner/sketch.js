let enemies = [];
let driver;
let size = 5;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  for (let i = 0; i < 1; i++) {
    let x = floor(random(size,width-size))
    let y = floor(random(size,height-size))
    let _enemy = new Enemy(x, y)
    enemies[i] = _enemy;
  }
  driver = new Driver();
}

function Driver(){
  this.dir = createVector(0,0);
  this.x = width/2;
  this.y = height/2;
  this.inShape = false;

  this.verts = []

  this.show = function(){
    push()
    translate(this.x, this.y)
    ellipse(0,0, 5)
    pop()
  }
  this.addVertex = function(){
    this.verts.push(createVector(this.x,this.y))
    vertex(this.x, this.y)

    for(vert of this.verts){
      if(createVector(this.x,this.y).dist(vert)<5){
        endShape();
      }
    }
  }
  this.update = function(){
    let nextP = createVector(this.x + this.dir.x, this.y + this.dir.y);
    if (nextP.x < size/2 || nextP.x + size/2 > width || nextP.y < size/2 || nextP.y + size/2 > height) {
    this.dir = createVector(0,0)
      fill('red')
      endShape()    
    }
    else {
      this.x = nextP.x
      this.y = nextP.y
    }
  }
}
function draw() {
  driver.update()
  driver.show()
  for (enemy of enemies) {
    enemy.show()
    enemy.update()
  }
}

function keyPressed(){
  if(driver.dir.x == 0 && driver.dir.y==0){beginShape(QUADS)}
  switch(keyCode){
    case(UP_ARROW):   {driver.dir = createVector(0, -1 ); driver.addVertex(); break;}
    case(DOWN_ARROW):{ driver.dir = createVector(0, 1 ); driver.addVertex(); break;}
    case(LEFT_ARROW): {driver.dir = createVector(-1, 0); driver.addVertex(); break;}
    case(RIGHT_ARROW): {driver.dir = createVector(1, 0 ); driver.addVertex(); break;}
  }
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 */
function Enemy(x, y) {
  this.x = x;
  this.y = y;

  this.vel = p5.Vector.random2D().normalize()
  this.update = () => {
    let nextP = createVector(this.x + this.vel.x, this.y + this.vel.y);
    if (nextP.x < size/2 || nextP.x + size/2 > width || nextP.y < size/2 || nextP.y + size/2 > height) {
      let angle = random(45, 315) //  2PI ± PI/4
      this.x = nextP.x - this.vel.x
      this.y = nextP.y - this.vel.y
      this.vel.rotate(angle)
      
    }
    else {
      this.x = nextP.x
      this.y = nextP.y
    }
  }
  this.show = () => {
    push();
    translate(this.x, this.y);
    fill(0)
    ellipse(0, 0, size);
    pop();
  }
}
Enemy.prototype.toString = function () {
  console.log(`[${this.x}, ${this.y}]`)
}