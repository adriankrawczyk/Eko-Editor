import { ContextProps } from '../App';
import { setContextBoxRightbar } from '../Elements/AddContentBox';
import { setPhotoRightbar } from '../Elements/AddPhoto';
import { setTextRightbar } from '../Elements/AddText';
import { canvas } from './CanvasInstance';
import MouseIconObject from './MouseIconObject';

export let mouseIcon: MouseIconObject | null;

export const setMouseIcon = (obj: fabric.Object | null, context: ContextProps, moving: boolean) => {
  mouseIcon = obj as MouseIconObject;
  if (mouseIcon) {
    mouseIcon.set({ moving });
    switch (mouseIcon.type) {
      case 'image': {
        context.scaleX = Math.round((mouseIcon.scaleX as number) * 100);
        context.scaleY = Math.round((mouseIcon.scaleY as number) * 100);
        context.photoType = mouseIcon.clipPath && mouseIcon.clipPath.type === 'circle' ? 'Circular' : 'Rectangular';
        setPhotoRightbar(context);
        break;
      }
      case 'rect': {
        context.width = mouseIcon.width as number;
        context.height = mouseIcon.height as number;
        context.resolution = mouseIcon.resolution || '1:1';
        setContextBoxRightbar(context);
        break;
      }
      case 'text': {
        context.fontSize = (mouseIcon as unknown as fabric.Text).fontSize as number;
        context.textValue = (mouseIcon as unknown as fabric.Text).text as string;
        context.angle = mouseIcon.angle as number;

        setTextRightbar(context);
        break;
      }
      default: {
        alert(mouseIcon.type);
        break;
      }
    }
    canvas.setActiveObject(mouseIcon);
    canvas.bringToFront(mouseIcon);
    mouseIcon.setCoords();
  }
};
