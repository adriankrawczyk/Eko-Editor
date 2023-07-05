import { canvas } from './CanvasInstance';

export let mouseIcon: fabric.Object | null;

export const setMouseIcon = (obj: fabric.Object | null) => {
  mouseIcon = obj;
  if (mouseIcon) canvas.bringToFront(mouseIcon);
};
