import { fabric } from 'fabric';
import { canvas } from './CanvasInstance';

const SetBackgroundMask = () => {
  const src = 'https://us-wbe.gr-cdn.com/popups/panel/65591051065b3c9c156c495188ecf13b.webp';

  fabric.Image.fromURL(src, (image: fabric.Image) => {
    const pattern = new fabric.Pattern({
      source: image.getElement() as HTMLImageElement,
      repeat: 'repeat',
    });

    canvas.setBackgroundColor(pattern, () => {
      canvas.requestRenderAll();
    });
  });
};

export default SetBackgroundMask;
