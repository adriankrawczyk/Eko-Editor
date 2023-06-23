import { fabric } from 'fabric';
import AddOutline from './AddOutline';
import GroupWithOutlineEvents from './GroupWithOutlineEvents';
import AddTextBox from './AddTextBox';
import CustomObjectOptions from './CustomObjectOptions';

const AddBasicCard = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const cardWidth = 800;
  const cardHeight = 400;

  const card = new fabric.Rect({
    width: cardWidth,
    height: cardHeight,
    fill: 'white',
    left: (canvasWidth - cardWidth) / 2,
    top: (canvasHeight - cardHeight) / 2,
  });
  const textBox = AddTextBox(canvas);
  const outline = AddOutline({ parent: card, canvas, description: 'Body' });
  const cardGroup = new fabric.Group([card, outline], { shape: 'card' } as CustomObjectOptions);
  const cardGroupWithEvents = GroupWithOutlineEvents({ canvas, parent: cardGroup, outline });
  canvas.add(cardGroupWithEvents, textBox);
};

export default AddBasicCard;
