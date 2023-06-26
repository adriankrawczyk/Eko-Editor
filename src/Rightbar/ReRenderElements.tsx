import AddTextBox from '../Canvas/AddTextBox';
import { canvas } from '../Canvas/CanvasInstance';
import { mainCard, setMainCard } from '../Canvas/AddBasicCard';
import AddOutline from '../Canvas/AddOutline';
import GroupWithOutlineEvents from '../Canvas/GroupWithOutlineEvents';
import CustomObject from '../Canvas/CustomObject';

const ReRenderElements = (add: boolean) => {
  const TEXT_BOX_HEIGHT = 200;
  const BORDER_MARGIN = 30;
  const elements = mainCard['elements'];

  const height = elements.length * TEXT_BOX_HEIGHT + TEXT_BOX_HEIGHT * 0.75;
  mainCard.height = height;

  mainCard.top = (canvas.getHeight() - height) / 2;
  mainCard['remove'](mainCard.outline);
  const outline = AddOutline({ description: 'Body', parent: mainCard });
  mainCard['addWithUpdate'](outline);
  mainCard.outline = outline;
  canvas.remove(mainCard);
  const newMainCard = GroupWithOutlineEvents({ canvas, parent: mainCard, outline }) as CustomObject;
  canvas.add(newMainCard);
  newMainCard.sendToBack();
  if (!newMainCard.outline || !newMainCard.card) return;
  const newTop = (newMainCard.outline.top as number) - BORDER_MARGIN / 2;
  newMainCard.card.set({ height, top: newTop });

  setMainCard(newMainCard);
  elements.forEach((element: fabric.Group, index: number) => {
    if (element.top && mainCard.top && mainCard.height) {
      element.top = mainCard.top + index * TEXT_BOX_HEIGHT + (add ? TEXT_BOX_HEIGHT / 2 : TEXT_BOX_HEIGHT) - BORDER_MARGIN;
      element.setCoords().addWithUpdate();
    }
  });
  canvas.requestRenderAll();
};
export default ReRenderElements;
