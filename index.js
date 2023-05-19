const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const STEP = 10;

const gridPoints = [];

class Circle {
  constructor(x, y) {
    this.centre = [x, y];
  }
  // 2D implicit function. Not to be accessed publicly
  fieldPotential(x, y) {
    const r = Math.sqrt((this.centre[0] - x) ** 2 + (this.centre[1] - y) ** 2);
    return r > 0 ? 1 / r : 1;
  }
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {Array<Circle>} circles
 * @returns {number} sum of force
 */
function totalPotential(x, y, circles) {
  return circles.reduce(
    (initialValue, circle) => initialValue + circle.fieldPotential(x, y),
    0
  );
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
      const fieldPotential = totalPotential(i * STEP, j * STEP, [
        circle1,
        circle2,
      ]);

      const pointOpacity =
        fieldPotential * 100 > 1 ? fieldPotential ** 2 * 10 ** 6 : 0;
      strokeWeight(10);
      stroke(Math.random(), 100, 200, pointOpacity);
      point(i * STEP, j * STEP);
    }
  }
}
