const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const STEP = 20;

const gridPoints = [];

class Circle {
  constructor(x, y) {
    this.centre = [x, y];
  }
  // 2D implicit function. Not to be accessed publicly
  fieldForce(x, y) {
    const r = Math.sqrt((this.centre[0] - x) ** 2 + (this.centre[1] - y) ** 2);
    return r > 0 ? 1 / r : 1;
  }
}

// Add grid points from 0 to screen width and 0 to screen height
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  strokeWeight(3);

  const rows = Math.floor(WIDTH / STEP) + 1;
  const cols = Math.floor(HEIGHT / STEP) + 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const MAX_STROKE = 15;
      const circle = new Circle(150, 150);
      const fieldForce = circle.fieldForce(i * STEP, j * STEP);
      const pointStrokeWeight = fieldForce * 1000;
      strokeWeight(
        pointStrokeWeight > MAX_STROKE ? MAX_STROKE : pointStrokeWeight
      );
      stroke("purple");
      point(i * STEP, j * STEP);
    }
  }
}
