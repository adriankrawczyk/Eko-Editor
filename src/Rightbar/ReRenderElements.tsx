import { canvas } from '../Canvas/CanvasInstance';
import { mainCard, setMainCard } from '../Canvas/Elements/MainCard/AddBasicCard';
import AddOutline from '../Canvas/Elements/Outline/AddOutline';
import GroupWithOutlineEvents from '../Canvas/Elements/Logic/GroupWithOutlineEvents';
import CustomObject from '../Canvas/Elements/Logic/CustomObject';

const ReRenderElements = (add: boolean) => {
  const TEXT_BOX_HEIGHT = 200;
  const BORDER_MARGIN = 0;
  const OUTLINE_MARGIN = 20;
  const elements = mainCard['elements'];
  const height = elements.length * TEXT_BOX_HEIGHT + OUTLINE_MARGIN * 2;
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
      element.top = mainCard.top + index * TEXT_BOX_HEIGHT + (add ? OUTLINE_MARGIN : OUTLINE_MARGIN + TEXT_BOX_HEIGHT / 2) + OUTLINE_MARGIN;
      element.setCoords().addWithUpdate();
    }
  });

  canvas.requestRenderAll();
};
export default ReRenderElements;
