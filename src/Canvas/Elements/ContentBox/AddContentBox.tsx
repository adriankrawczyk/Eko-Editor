import { fabric } from 'fabric';
import AddOutline from '../Outline/AddOutline';
import GroupWithOutlineEvents from '../Logic/GroupWithOutlineEvents';
import CustomObjectOptions from '../Logic/CustomObjectOptions';
import { canvas } from '../../CanvasInstance';

const AddContentBox = (left: number, top: number) => {
  const containerWidth = 800;
  const containerHeight = 200;

  const container = new fabric.Rect({
    width: containerWidth,
    height: containerHeight,
    fill: 'white',
    left: left - containerWidth / 2,
    top: top - containerHeight / 2,
  });

  const outline = AddOutline({ parent: container, description: 'Content' });

  const contentBoxGroup = new fabric.Group([container, outline], {
    shape: 'content',
    outline,
  } as CustomObjectOptions);

  const contentBoxGroupWithEvents = GroupWithOutlineEvents({ canvas, parent: contentBoxGroup, outline });

  return contentBoxGroupWithEvents;
};

export default AddContentBox;
