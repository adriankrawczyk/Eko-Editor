import { fabric } from 'fabric';
import { canvas } from './CanvasInstance';

const SetBackgroundMask = (color: string) => {
  const src = 'tile.webp';

  fabric.Image.fromURL(src, (image: fabric.Image) => {
    const filter = new fabric.Image.filters.BlendColor({
      color: color,
      mode: 'tint',
      alpha: 0.5,
    });
    if (image.filters) image.filters.push(filter);
    image.applyFilters();

    image.applyFilters();

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
