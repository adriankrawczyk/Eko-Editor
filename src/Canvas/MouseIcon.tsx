import { canvas } from './CanvasInstance';

export let mouseIcon: fabric.Object | null;

export const setMouseIcon = (obj: fabric.Object | null) => {
  mouseIcon = obj;
  if (mouseIcon) {
    mouseIcon.set({ opacity: 0 });
    mouseIcon.setCoords();
    canvas.bringToFront(mouseIcon);
  }
};
