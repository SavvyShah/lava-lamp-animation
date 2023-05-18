const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const STEP = 20;

const gridPoints = [];

class Circle {
  constructor(x, y) {
    this.centre = [x, y];
  }
  // 2D implicit function. Not to be accessed publicly
  distance(x, y) {
    return Math.sqrt((this.centre[0] - x) ** 2 + (this.centre[1] - y) ** 2);
  }
}

// Add grid points from 0 to screen width and 0 to screen height
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background(200);
  strokeWeight(3);

  const rows = Math.floor(WIDTH / STEP) + 1;
  const cols = Math.floor(HEIGHT / STEP) + 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const circle = new Circle(150, 150);
      const pointColor =
        circle.distance(i * STEP, j * STEP) < 100 ? "purple" : "white";
      stroke(pointColor);
      point(i * STEP, j * STEP);
    }
  }
}
