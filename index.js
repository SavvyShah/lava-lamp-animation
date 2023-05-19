const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const STEP = 10;

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
  clear();

  const rows = Math.floor(WIDTH / STEP) + 1;
  const cols = Math.floor(HEIGHT / STEP) + 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const circle1 = new Circle(300, 300);
      const circle2 = new Circle(700, 300);
      const fieldForce1 = circle1.fieldForce(i * STEP, j * STEP);
      const fieldForce2 = circle2.fieldForce(i * STEP, j * STEP);
      const fieldForce = fieldForce1 + fieldForce2;

      const pointOpacity = fieldForce * 100 > 1 ? fieldForce ** 2 * 10 ** 6 : 0;
      strokeWeight(10);
      stroke(Math.random(), 100, 200, pointOpacity);
      point(i * STEP, j * STEP);
    }
  }
}
