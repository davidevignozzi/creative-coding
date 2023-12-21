const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

// ! renamed Point -> Vector
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y); // ! renamed Point -> Vector
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  // Animations
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  // Draw
  draw(context) {
    context.save();

    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);

    context.lineWidth = 4;
    context.fill();
    context.stroke();

    context.restore();
  }
}

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

const sketch = ({ width, height }) => {
  const agents = [];

  /**
   * populate agents
   */
  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      // Foreach agent we go voer other agents
      // j = i + 1 to not have a duplicate of the line => from 0 to 1 and from 1 to 0
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        // Draw the line only if the distance is < 200
        if (dist > 200) continue;

        // Draw the line
        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1); // mapRange(value, inputMin, inputMax, ouptutMin, outputMax, clamp = false). Maps the value from one range of [inputMin..inputMax] to another range of [outputMin..outputMax], with min/max being inclusive
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y); // <- line start position
        context.lineTo(other.pos.x, other.pos.y); // <- line end position
        context.stroke();
      }
    }

    // const point = { x: 800, y: 400, radius: 10 };
    // const pointA = new Point(800, 400, 10);
    // const pointB = new Point(300, 700, 10);
    // const agentA = new Agent(800, 400);
    // const agentB = new Agent(300, 700);

    /**
     * Point A
     */
    // context.beginPath();
    // context.arc(pointA.x, pointA.y, pointA.radius, 0, Math.PI * 2);
    // context.fillStyle = 'black';
    // context.fill();
    // agentA.draw(context);

    /**
     * Point B
     */
    // context.beginPath();
    // context.arc(pointB.x, pointB.y, pointB.radius, 0, Math.PI * 2);
    // context.fill();
    // agentB.draw(context);

    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);
