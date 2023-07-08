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
        setPhotoRightbar(context);
        break;
      }
      case 'rect': {
        setContextBoxRightbar(context);
        break;
      }
      case 'text': {
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
