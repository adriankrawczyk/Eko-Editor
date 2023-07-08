import { ContextProps } from '../App';
import { setContextBoxRightbar } from '../Elements/AddContentBox';
import { setPhotoRightbar } from '../Elements/AddPhoto';
import { setTextRightbar } from '../Elements/AddText';
import { canvas } from './CanvasInstance';

export let mouseIcon: fabric.Object | null;

export const setMouseIcon = (obj: fabric.Object | null, context: ContextProps) => {
  mouseIcon = obj;
  if (mouseIcon) {
    switch (mouseIcon.type) {
      case 'image': {
        context.size = mouseIcon.width as number;
        setPhotoRightbar(context);
        break;
      }
      case 'rect': {
        context.width = mouseIcon.width as number;
        context.height = mouseIcon.height as number;
        setContextBoxRightbar(context);
        break;
      }
      case 'text': {
        context.fontSize = (mouseIcon as fabric.Text).fontSize as number;
        context.textValue = (mouseIcon as fabric.Text).text as string;
        context.angle = mouseIcon.angle as number;

        setTextRightbar(context);
        break;
      }
      default: {
        alert(mouseIcon.type);
        break;
      }
    }
    mouseIcon.setCoords();
    canvas.bringToFront(mouseIcon);
  } else context.setRightbarContent(<></>);
};
