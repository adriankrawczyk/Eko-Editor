import { fabric } from 'fabric';
import CustomObject from './CustomObject';
import { FabricContextProps } from '../../../App';
import TextRightbar from '../../../Rightbar/TextRightbar';
import CardRightbar from '../../../Rightbar/CardRightbar';

const handleSelection = (selectedObject: CustomObject, fabricContext: FabricContextProps) => {
  if (!selectedObject) return;
  const { setRightbarContent } = fabricContext;

  switch (selectedObject.shape) {
    case 'text': {
      if (!selectedObject._objects) break;
      const textObj = selectedObject.text as fabric.IText;

      const textProps = {
        fontSize: textObj.fontSize || 16,
        fontFamily: textObj.fontFamily || 'Arial',
        color: textObj.fill ? textObj.fill.toString() : '#000',
      };
      setRightbarContent(TextRightbar(textProps));
      break;
    }
    case 'card': {
      const cardProps = {
        width: selectedObject.width || 200,
        height: selectedObject.height || 100,
        color: selectedObject.fill ? selectedObject.fill.toString() : '#FFF',
      };
      setRightbarContent(CardRightbar(cardProps));
      break;
    }

    default:
      break;
  }
};
const fadeOut = (parent: CustomObject, canvas: fabric.Canvas) => {
  const outline = parent.outline;
  if (outline)
    outline.animate('opacity', 0, {
      duration: 150,
      onChange: canvas.renderAll.bind(canvas),
    });
};
const OnSelectionEvents = (canvas: fabric.Canvas, fabricContext: FabricContextProps) => {
  canvas.on('selection:created', (e) => {
    if (!e.selected) return;
    handleSelection(e.selected[0] as CustomObject, fabricContext);
  });
  canvas.on('selection:updated', (e) => {
    if (!e.selected) return;
    handleSelection(e.selected[0] as CustomObject, fabricContext);
  });
  canvas.on('selection:cleared', (e) => {
    if (e.deselected && e.deselected[0].type === 'group') {
      const parent = e.deselected[0] as CustomObject;
      fadeOut(parent, canvas);
      const { setRightbarContent } = fabricContext;
      setRightbarContent(<></>);
    }
  });
};
export default OnSelectionEvents;