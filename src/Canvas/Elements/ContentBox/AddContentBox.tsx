import { fabric } from 'fabric';
import AddOutline from '../Outline/AddOutline';
import GroupWithOutlineEvents from '../Logic/GroupWithOutlineEvents';
import CustomObjectOptions from '../Logic/CustomObjectOptions';
import { canvas } from '../../CanvasInstance';

const AddContentBox = (left: number, top: number, containerWidth: number, containerHeight: number, parent?: fabric.Object) => {
  const rect = new fabric.Rect({
    width: containerWidth,
    height: containerHeight,
    fill: `white`,
    strokeWidth: 1,
    stroke: 'blue',
    left: left,
    top: top,
  });

  const text = new fabric.Text('Content', {
    left,
    top,
    fill: 'blue ',
    fontFamily: 'Arial',
    fontSize: 30,
  });

  // const outline = AddOutline({ parent: container, description: 'Content' });

  // const contentBoxGroup = new fabric.Group([container, outline, text], {
  //   shape: 'content',
  //   outline,
  //   parent,
  // } as CustomObjectOptions);

  // const contentBoxGroupWithEvents = GroupWithOutlineEvents({ canvas, parent: contentBoxGroup, outline });

  return new fabric.Group([rect, text], { shape: 'content', date: Date.now(), text } as unknown as CustomObjectOptions);
};

export default AddContentBox;
