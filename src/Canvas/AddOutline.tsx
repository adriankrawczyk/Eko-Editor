import { fabric } from 'fabric';

interface AddOutlineParams {
  canvas: fabric.Canvas;
  parent: fabric.Object;
  description: string;
}
const AddOutline = ({ canvas, description, parent }: AddOutlineParams) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const outlineMargin = 30;
  const outlineWidth = (parent.width as number) - outlineMargin;
  const outlineHeight = (parent.height as number) - outlineMargin;
  const bodyOutlineLeft = (canvasWidth - outlineWidth) / 2;
  const bodyOutlineTop = (canvasHeight - outlineHeight) / 2;

  const bodyOutline = new fabric.Rect({
    left: bodyOutlineLeft,
    top: bodyOutlineTop,
    width: outlineWidth,
    height: outlineHeight,
    stroke: 'rgba(10,180,255,255)',
    strokeWidth: 1,
    fill: 'transparent',
  });
  const textBackground = new fabric.Rect({
    left: bodyOutlineLeft,
    top: bodyOutlineTop,
    width: 60,
    height: 40,
    fill: 'rgba(10,180,255,255)',
  });

  const text = new fabric.Text(description, {
    left: bodyOutlineLeft + 10,
    top: bodyOutlineTop + 10,
    fontSize: 16,
    fill: 'white',
    fontFamily: 'arial',
  });

  const bodyGroup = new fabric.Group([bodyOutline, textBackground, text], {
    left: bodyOutlineLeft,
    top: bodyOutlineTop,
    opacity: 0,
  });

  return bodyGroup;
};

export default AddOutline;
