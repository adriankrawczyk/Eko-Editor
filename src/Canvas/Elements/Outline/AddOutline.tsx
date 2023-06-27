import { fabric } from 'fabric';

interface AddOutlineParams {
  parent: fabric.Object;
  description: string;
}

const AddOutline = ({ description, parent }: AddOutlineParams) => {
  const outlineMargin = 0;
  const outlineWidth = (parent.width as number) - outlineMargin;
  const outlineHeight = (parent.height as number) - outlineMargin;
  const left = parent.left as number;
  const top = parent.top as number;
  const bodyOutlineLeft = left + outlineMargin / 2;
  const bodyOutlineTop = top + outlineMargin / 2;

  const bodyOutline = new fabric.Rect({
    left: bodyOutlineLeft,
    top: bodyOutlineTop,
    width: outlineWidth,
    height: outlineHeight,
    stroke: 'rgba(10, 180, 255, 255)',
    strokeWidth: 1,
    fill: 'transparent',
  });

  const textBackground = new fabric.Rect({
    left: bodyOutlineLeft,
    top: bodyOutlineTop,
    width: 60,
    height: 40,
    fill: 'rgba(10, 180, 255, 255)',
  });

  const text = new fabric.Text(description, {
    left: bodyOutlineLeft + (8 - description.length) * 2,
    top: bodyOutlineTop + 10,
    width: textBackground.width,
    height: textBackground.height,
    fontSize: 16,
    fill: 'white',
    fontFamily: 'arial',
    textAlign: 'center',
  });

  const bodyGroup = new fabric.Group([bodyOutline, textBackground, text], {
    left: bodyOutlineLeft,
    top: bodyOutlineTop,
    opacity: 0,
  });

  return bodyGroup;
};

export default AddOutline;
