const canvasSketch = require('canvas-sketch');

const settings = {
  // dimensions: [600, 600] // <- in pixels

  // A4 paper
  // dimensions: 'A4',
  // pixelsPerInch: 300,
  // orientation: 'landscape'

  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // context.fillStyle = '#ffffff';
    context.fillStyle = '#000000';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = '#ffffff';

    context.lineWidth = width * 0.01;

    // const w = 60;
    // const h = 60;
    // const gap = 20;

    const w = width * 0.1; // 10% of the width
    const h = height * 0.1; // 10% of the height
    const gap = width * 0.03; // 3% of the width

    const ix = width * 0.17; // ix stands for "initial x"
    const iy = height * 0.17; // iy stands for "initial y"

    const off = width * 0.02; // off stands for "offset"

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
