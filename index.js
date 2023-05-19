const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const STEP = 10;

class Circle {
  constructor(x, y, v, s = 4) {
    this.centre = [x, y];
    this.velocity = v;
    this.size = s;
  }

  // Outputs field values in range of [0, MAX_VALUE]
  // MAX_VALUE is as defined inside function.
  // You can then easily cutoff values less than 0.01. i.e. THRESHOLD = 0.01
  fieldPotential(x, y) {
    // Number of pixels in a unit
    const UNIT = (this.size * Math.max(WIDTH, HEIGHT)) / 20;
    // MAX field value when on the charge itself. i.e. the center
    const MAX_VALUE = 10 ** 5;

    const rSquare =
      ((this.centre[0] - x) ** 2 + (this.centre[1] - y) ** 2) / UNIT ** 2;
    return rSquare > 0 ? 1 / rSquare ** 2 : MAX_VALUE;
  }
  move() {
    if (this.centre[0] < 0 || this.centre[0] >= WIDTH) {
      // Horizontal velocity becomes opposite
      this.velocity[0] = -this.velocity[0];
    }
    this.centre[0] = this.centre[0] - this.velocity[0];

    if (this.centre[1] < 0 || this.centre[1] >= HEIGHT) {
      // Vertical velocity becomes opposite
      this.velocity[1] = -this.velocity[1];
    }
    this.centre[1] = this.centre[1] - this.velocity[1];
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

const circle1 = new Circle(300, 300, [Math.random() * 5, Math.random() * 5], 3);
const circle2 = new Circle(600, 300, [Math.random() * 5, Math.random() * 5], 5);

// Add grid points from 0 to screen width and 0 to screen height
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  clear();
  circle1.move();
  circle2.move();

  const rows = Math.floor(WIDTH / STEP) + 1;
  const cols = Math.floor(HEIGHT / STEP) + 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const fieldPotential = totalPotential(i * STEP, j * STEP, [
        circle1,
        circle2,
      ]);

      const pointOpacity = fieldPotential * 8;
      strokeWeight(10);
      stroke(0, 100, 200, pointOpacity);
      point(i * STEP, j * STEP);
    }
  }
}
