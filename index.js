const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const STEP = 20;

const gridPoints = [];

// Add grid points from 0 to screen width and 0 to screen height
function setup() {
  createCanvas(WIDTH, HEIGHT);
  gridPoints;
}

function draw() {
  background(200);
  stroke("purple");
  strokeWeight(3);

  const rows = Math.floor(WIDTH / STEP) + 1;
  const cols = Math.floor(HEIGHT / STEP) + 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      point(i * STEP, j * STEP);
    }
  }
}
