const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = 10;
  }

  draw(context) {
    context.fillStyle = 'black';

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

const settings = {
  dimensions: [1080, 1080]
};

const sketch = ({ context, width, height }) => {
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
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);
