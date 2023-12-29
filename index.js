const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const PIXEL_SIZE = 10;
const SCALE = WIDTH > 1000 ? WIDTH / 1000 : 1;
const UNIT_SIZE = Math.max(WIDTH, HEIGHT) / 100;
const THRESHOLD = 0.5;

const ROWS = Math.floor(HEIGHT / PIXEL_SIZE) + 1;
const COLS = Math.floor(WIDTH / PIXEL_SIZE) + 1;

/**
 * The base unit of charge
 * which depends on the screen size and pixel size and controls the power of force
 * */
const UNIT_CHARGE = PIXEL_SIZE * UNIT_SIZE;

class Circle {
  constructor(x, y, v, s = 4) {
    this.centre = [x, y];
    this.velocity = v;
    this.q = s;
  }

  // Outputs field values in range of [0, MAX_VALUE]
  // MAX_VALUE is as defined inside function.
  fieldPotential(x, y) {
    // Simulate infinity. MAX field value when on the charge itself. i.e. the center
    const MAX_VALUE = 100000;

    // r: distance from the center
    const r = Math.sqrt((this.centre[0] - x) ** 2 + (this.centre[1] - y) ** 2);

    // If r is 0, then return MAX_VALUE
    return r > 0 ? (this.q * UNIT_CHARGE) / r : MAX_VALUE;
  }
  move() {
    // If we hit the left or right of the screen
    if (this.centre[0] < 0 || this.centre[0] >= WIDTH) {
      // Horizontal velocity becomes opposite
      this.velocity[0] = -this.velocity[0];
    }
    this.centre[0] = this.centre[0] - this.velocity[0];

    // If we hit the top or bottom of the screen
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

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const circles = [null, null, null].map(
  () =>
    new Circle(
      randomInRange(0, WIDTH),
      randomInRange(0, HEIGHT),
      [randomInRange(-SCALE, SCALE), randomInRange(-SCALE, SCALE)],
      randomInRange(UNIT_SIZE + PIXEL_SIZE * 20, UNIT_SIZE + PIXEL_SIZE * 30)
    )
);

// Add grid points from 0 to screen width and 0 to screen height
function setup() {
  createCanvas(WIDTH - 4, HEIGHT - 4);
}

function draw() {
  clear();
  circles.forEach((circle) => circle.move());

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const fieldPotential = totalPotential(
        i * PIXEL_SIZE,
        j * PIXEL_SIZE,
        circles
      );

      let pointOpacity = fieldPotential;
      strokeWeight(10);
      //  We only want to get gradient by changing green from [100, 200]
      const gradient = 100 + j * (100 / ROWS);
      if (pointOpacity < THRESHOLD) {
        pointOpacity = 0;
      }
      fill(225, gradient, 25, pointOpacity);
      strokeWeight(0);
      square(i * PIXEL_SIZE, j * PIXEL_SIZE, PIXEL_SIZE);
      strokeWeight(10);
    }
  }
}
