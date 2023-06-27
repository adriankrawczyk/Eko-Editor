import { fabric } from 'fabric';
import AddOutline from '../Outline/AddOutline';
import GroupWithOutlineEvents from '../Logic/GroupWithOutlineEvents';
import AddTextBox from '../TextBox/AddTextBox';
import CustomObjectOptions from '../Logic/CustomObjectOptions';
import CustomObject from '../Logic/CustomObject';
import MainObject from './MainObject';
let mainCard: CustomObject;
const setMainCard = (newMainCard: CustomObject) => {
  mainCard = newMainCard;
};
const AddBasicCard = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const cardWidth = 800;
  const cardHeight = 225;
  const card = new fabric.Rect({
    width: cardWidth,
    height: cardHeight,
    fill: 'white',
    left: (canvasWidth - cardWidth) / 2,
    top: (canvasHeight - cardHeight) / 2,
  });
  const textBox = AddTextBox(canvasWidth / 2, canvasHeight / 2);
  const outline = AddOutline({ parent: card, description: 'Body' });
  const cardGroup = new fabric.Group([card, outline], { shape: 'card', outline, card } as CustomObjectOptions);
  const cardGroupWithEvents = GroupWithOutlineEvents({ canvas, parent: cardGroup, outline }) as fabric.Group;

  mainCard = cardGroupWithEvents as unknown as MainObject;
  mainCard['elements'] = [textBox];

  canvas.add(cardGroupWithEvents, textBox);
};

export { AddBasicCard, mainCard, setMainCard };
