const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    context.save(); // <- save the state of the context

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    context.translate(x, y);
    context.rotate(0.5);

    context.beginPath();
    // context.rect(x, y, w, h); // <- will be at the center left (without transform)
    context.rect(-w * 0.5, -h * 0.5, w, h); // <- if translated (context.translate(x, y)) will be to the center
    context.fill();

    context.restore(); // <- restore the state of the context. In this way if i will create another figure, it will have the origin at [0, 0] (in the high left corner)

    // * This will be the block:
    /**
     * context.save();
     *
     * ... code here
     *
     * context.restore();
     */
  };
};

canvasSketch(sketch, settings);
