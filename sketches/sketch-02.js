const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

/**
 * Converts degrees to radiants.
 *
 * @param {number} degrees - The angle in degrees to be converted.
 * @returns {number} The equivalent angle in radiants.
 */
const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
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

    const num = 12; // <- number of copies
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
      const slice = degToRad(360 / num); // size of the slice
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

      context.beginPath();
      // context.rect(x, y, w, h); // <- will be at the center left (without transform)
      context.rect(-w * 0.5, -h * 0.5, w, h); // <- if translated (context.translate(x, y)) will be to the center
      context.fill();

      context.restore(); // <- restore the state of the context. In this way if i will create another figure, it will have the origin at [0, 0] (in the high left corner)
    }
  };
};

canvasSketch(sketch, settings);
