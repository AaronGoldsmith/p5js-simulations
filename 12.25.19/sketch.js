let slider;
let clearBtn;
let count;
function setup() { 
  let size = max(windowWidth, 400)
  createCanvas(size, 400);
  background(220);
  slider = createSlider(0,50,15);
  clearBtn = createButton('clear');
  clearBtn.mousePressed(clearScreen); 
} 
function clearScreen(){
  clear()
  background(120);
}

function draw() { 
  if(mouseX>0 && mouseX<width && mouseY>0&&mouseY<height){
    if(mouseIsPressed){
      push()
      strokeWeight(slider.value());
      stroke(220)
      line(mouseX, mouseY, pmouseX, pmouseY);
      pop()
    }
    
  }
}