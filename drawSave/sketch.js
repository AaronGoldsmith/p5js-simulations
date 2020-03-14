let slider;
let clearBtn;
let count;

let locs;
let img
let setLocs;
function setup() { 
  createCanvas(windowWidth, 140);
  background(120);
  slider = createSlider(0,50,15);
  clearBtn = createButton('clear');
  clearBtn.mousePressed(clearScreen); 
  locs = []
  setLocs = new Set();
  img = createImage(width, height);

} 
function clearScreen(){
  clear()
  if(setLocs.size){
    setLocs = setLocs.clear()
  }
  locs = []
  background(120);
}

function handleDraw(){
  if(mouseX>0 && mouseX<width && mouseY>0&&mouseY<height){
    if(mouseIsPressed){
      locs.push(`${mouseX},${mouseY}`)
      push()
      strokeWeight(slider.value());
      stroke(220)
      line(mouseX, mouseY, pmouseX, pmouseY);
      let sx,bx,sy,by;
      // drawing vertical line
      if(mouseX == pmouseX){
        if(mouseY>pmouseY){sy=pmouseY;by=mouseY}
        else{sy=mouseY; by=pmouseY}
        for(let i = sy;i<by;i++){
          locs.push(`${mouseX},${i}`)
        }
      }
      // drawing horizontal line
      else if(mouseY==pmouseY){
        if(mouseX>pmouseX){sx=pmouseX;bx=mouseX}
        else{sx=mouseX; bx=pmouseX}
        for(let i = sx;i<bx;i++){
          locs.push(`${i},${mouseY}`)
        }
      }
      else{
        let previous = createVector(pmouseX,pmouseY);
        let current = createVector(mouseX,mouseY);
        for(let i = 0;i<20;i++){
          let z = p5.Vector.lerp(previous, current, i*0.05)
          locs.push(`${z.x},${z.y}`)
        }
      }
      pop()
    }
  }
}

function logSetElements(value1, value2, set) {
  console.log(value1);
}
function parsePt(str, cb){
   let part  = str.split(',');
   let x = parseInt(part[0])
   let y = parseInt(part[1]);
   cb({x,y})
}

function keyPressed(){
  if(keyCode===ENTER){
    setLocs = [... new Set(locs)]
    clearScreen()
    img.loadPixels();
    setLocs.forEach((pt)=>parsePt(pt,ans=> {
      img.set(ans.x, ans.y, color(0))
    }))
    // console.log(img)
    img.updatePixels();
    image(img, 0,0);

  }
}
function draw() { 
  handleDraw()
  // background(200)
  // image(img, mouseX-width/2, mouseY-height/2);
}