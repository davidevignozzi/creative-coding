const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    // const x = width * 0.5;
    // const y = height * 0.5;
    // const w = width * 0.3;
    // const h = height * 0.3;

    const cx = width * 0.5; // center of the circle
    const cy = height * 0.5; // center of the circle
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 40; // <- number of copies
    const radius = width * 0.3; // <- radius of the circle

    // * This will be the block:
    /**
     * context.save();
     *
     * ... code here
     *
     * context.restore();
     */

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num); // size of the slice
      const angle = slice * i;

      // x = cx + radius * Math.sin(angle);
      // y = cy + radius * Math.cos(angle);
      x = radius * Math.sin(angle);
      y = radius * Math.cos(angle);

      context.save(); // <- save the state of the context

      /**
       * Transformations
       */
      context.translate(cx, cy);
      context.translate(x, y);

      // to transform from degrees in radiant it deserve this formula {degrees / 180 * Math.PI}
      // context.rotate(0.5); // is in gradiants not in degrees
      // context.rotate(degToRad(45));

      // context.rotate(angle);
      context.rotate(-angle);

      // context.scale(Math.random() * (3 - 1) + 1, 1); // <- scale x = random number between 1 and 3
      // context.scale(random.range(1, 3), 1);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      /**
       * Shape
       */
      context.beginPath();
      // context.rect(x, y, w, h); // <- will be at the center left (without transform)
      // context.rect(-w * 0.5, -h * 0.5, w, h); // <- if translated (context.translate(x, y)) will be to the center
      context.rect(-w * 0.5, random.range(0, -h * 0.5) * 0.5, w, h);
      context.fill();

      context.restore(); // <- restore the state of the context. In this way if i will create another figure, it will have the origin at [0, 0] (in the high left corner)

      /**
       * new block -> Arcs
       */
      context.save(); // * <- new block start

      context.translate(cx, cy); // <- translate to the center
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath(); // <- draw new shape
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -8),
        slice * random.range(1, 5)
      ); // <- define the arc slice by slice
      context.stroke();

      context.restore(); // * <- new block end
    }
  };
};

canvasSketch(sketch, settings);
