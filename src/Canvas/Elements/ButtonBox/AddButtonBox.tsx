import { fabric } from 'fabric';
import AddOutline from '../Outline/AddOutline';
import GroupWithOutlineEvents from '../Logic/GroupWithOutlineEvents';
import CustomObjectOptions from '../Logic/CustomObjectOptions';
import { canvas } from '../../CanvasInstance';

const AddButtonBox = (left: number, top: number) => {
  const containerWidth = 800;
  const containerHeight = 200;
  const buttonWidth = 300;
  const buttonHeight = 150;
  const container = new fabric.Rect({
    width: containerWidth,
    height: containerHeight,
    fill: 'white',
    left: left - containerWidth / 2,
    top: top - containerHeight / 2,
  });

  const button = new fabric.Rect({
    width: buttonWidth,
    height: buttonHeight,
    fill: 'blue',
    left: left - buttonWidth / 2,
    top: top - buttonHeight / 2,
    rx: 60,
    ry: 60,
  });

  const buttonText = new fabric.Text('Button Text', {
    left: left,
    top: top,
    fontSize: 24,
    fill: 'white',
    fontFamily: 'arial',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
  });

  const outline = AddOutline({ parent: container, description: 'Button' });

  const buttonBoxGroup = new fabric.Group([container, button, buttonText, outline], {
    shape: 'button',
    button,
    outline,
    toEdit: button,
    text: buttonText,
  } as CustomObjectOptions);

  const buttonBoxGroupWithEvents = GroupWithOutlineEvents({ canvas, parent: buttonBoxGroup, outline });

  return buttonBoxGroupWithEvents;
};

export default AddButtonBox;
