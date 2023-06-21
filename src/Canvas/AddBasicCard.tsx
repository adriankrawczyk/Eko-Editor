import { fabric } from 'fabric';

const AddBasicCard = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const width = 800;
  const height = 400;
  const rectangle = new fabric.Rect({
    width,
    height,
    fill: 'white',
    left: (canvasWidth - width) / 2,
    top: (canvasHeight - height) / 2,
    lockMovementY: true,
    lockMovementX: true,
  });

  canvas.add(rectangle);
};

export default AddBasicCard;
