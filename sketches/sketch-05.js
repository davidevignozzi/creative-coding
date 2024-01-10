const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = 'top';
    // context.textAlign = 'center';

    const metrix = context.measureText(text);
    const mx = metrix.actualBoundingBoxLeft * -1;
    const my = metrix.actualBoundingBoxAscent * -1;
    const mw =
      metrix.actualBoundingBoxLeft + metrix.actualBoundingBoxRight;
    const mh =
      metrix.actualBoundingBoxAscent + metrix.actualBoundingBoxDescent;

    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    // context.translate(width * 0.5, height * 0.57);
    context.translate(x, y);

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
  };
};

canvasSketch(sketch, settings);
