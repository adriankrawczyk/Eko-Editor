import { ContextProps } from '../App';
import { canvas } from './CanvasInstance';
import { setMouseIcon, mouseIcon } from './MouseIcon';
import { fabric } from 'fabric';

const SetCanvasEvents = (context: ContextProps) => {
  canvas.on('mouse:move', (event) => {
    if (!mouseIcon) return;

    const pointer = canvas.getPointer(event.e);
    mouseIcon.set({
      left: pointer.x,
      top: pointer.y,
    });
    if (mouseIcon.type === 'rect') stickRect(mouseIcon, pointer);
    canvas.requestRenderAll();
  });
  const stickRect = (mouseIcon: fabric.Object, pointer: { x: number; y: number }) => {
    const objects = canvas.getObjects();
    let closestObject = null;
    let closestDistance = Infinity;

    for (const object of objects) {
      const objectCenterX = object.left as number;
      const objectCenterY = object.top as number;

      const distance = Math.sqrt(Math.pow(pointer.x - objectCenterX, 2) + Math.pow(pointer.y - objectCenterY, 2));

      if (distance < closestDistance && object !== mouseIcon) {
        closestObject = object;
        closestDistance = distance;
      }
    }

    if (!closestObject) {
      canvas.requestRenderAll();
      return;
    }
    const stickDistance = 50;
    const objectLeft = closestObject.left as number;
    const objectTop = closestObject.top as number;
    const objectWidth = closestObject.width as number;
    const objectHeight = closestObject.height as number;
    const mouseIconHeight = mouseIcon.height as number;
    const mouseIconWidth = mouseIcon.width as number;

    const leftPoint = objectLeft - objectWidth / 2;
    const bottomPoint = objectTop + objectHeight / 2;
    const topPoint = objectTop - objectHeight / 2;
    const rightPoint = objectLeft + objectWidth / 2;
    const newTop = topPoint - mouseIconHeight / 2;
    const newBottom = bottomPoint + mouseIconHeight / 2;
    const newLeft = leftPoint - mouseIconWidth / 2;
    const newRight = rightPoint + mouseIconWidth / 2;

    const distanceTop = Math.sqrt(Math.pow(pointer.x - objectLeft, 2) + Math.pow(pointer.y - newTop, 2));
    const distanceBottom = Math.sqrt(Math.pow(pointer.x - objectLeft, 2) + Math.pow(pointer.y - newBottom, 2));
    const distanceLeft = Math.sqrt(Math.pow(pointer.y - objectTop, 2) + Math.pow(pointer.x - newLeft, 2));
    const distanceRight = Math.sqrt(Math.pow(pointer.y - objectTop, 2) + Math.pow(pointer.x - newRight, 2));

    const distanceTopLeft = Math.sqrt(Math.pow(pointer.x - leftPoint - mouseIconWidth / 2, 2) + Math.pow(pointer.y - newTop, 2));
    const distanceTopRight = Math.sqrt(Math.pow(pointer.x - rightPoint + mouseIconWidth / 2, 2) + Math.pow(pointer.y - newTop, 2));
    const distanceBottomLeft = Math.sqrt(Math.pow(pointer.x - leftPoint - mouseIconWidth / 2, 2) + Math.pow(pointer.y - newBottom, 2));
    const distanceBottomRight = Math.sqrt(Math.pow(pointer.x - rightPoint + mouseIconWidth / 2, 2) + Math.pow(pointer.y - newBottom, 2));

    const distanceLeftTop = Math.sqrt(Math.pow(pointer.x - newLeft, 2) + Math.pow(pointer.y - topPoint - mouseIconHeight / 2, 2));
    const distanceRightTop = Math.sqrt(Math.pow(pointer.x - newRight, 2) + Math.pow(pointer.y - topPoint - mouseIconHeight / 2, 2));
    const distanceLeftBottom = Math.sqrt(Math.pow(pointer.x - newLeft, 2) + Math.pow(pointer.y - bottomPoint + mouseIconHeight / 2, 2));
    const distanceRightBottom = Math.sqrt(Math.pow(pointer.x - newRight, 2) + Math.pow(pointer.y - bottomPoint + mouseIconHeight / 2, 2));

    if (distanceTop <= stickDistance) mouseIcon.set({ top: newTop, left: objectLeft });
    if (distanceBottom <= stickDistance) mouseIcon.set({ top: newBottom, left: objectLeft });
    if (distanceLeft <= stickDistance) mouseIcon.set({ left: newLeft, top: objectTop });
    if (distanceRight <= stickDistance) mouseIcon.set({ left: newRight, top: objectTop });

    if (distanceTopLeft <= stickDistance) mouseIcon.set({ top: topPoint - mouseIconHeight / 2, left: leftPoint + mouseIconWidth / 2 });
    if (distanceTopRight <= stickDistance) mouseIcon.set({ top: topPoint - mouseIconHeight / 2, left: rightPoint - mouseIconWidth / 2 });
    if (distanceBottomLeft <= stickDistance) mouseIcon.set({ top: bottomPoint + mouseIconHeight / 2, left: leftPoint + mouseIconWidth / 2 });
    if (distanceBottomRight <= stickDistance) mouseIcon.set({ top: bottomPoint + mouseIconHeight / 2, left: rightPoint - mouseIconWidth / 2 });

    if (distanceLeftTop <= stickDistance) mouseIcon.set({ top: topPoint + mouseIconHeight / 2, left: leftPoint - mouseIconWidth / 2 });
    if (distanceRightTop <= stickDistance) mouseIcon.set({ top: topPoint + mouseIconHeight / 2, left: rightPoint + mouseIconWidth / 2 });
    if (distanceLeftBottom <= stickDistance) mouseIcon.set({ top: bottomPoint - mouseIconHeight / 2, left: leftPoint - mouseIconWidth / 2 });
    if (distanceRightBottom <= stickDistance) mouseIcon.set({ top: bottomPoint - mouseIconHeight / 2, left: rightPoint + mouseIconWidth / 2 });
  };
  canvas.on('selection:created', (e) => {
    if (!e.selected) return;
    setMouseIcon(e.selected[0] as fabric.Object);
    canvas.discardActiveObject();
  });
  canvas.on('mouse:down', (e) => {
    if (mouseIcon && !e.target) {
      mouseIcon.setCoords();
      setMouseIcon(null);
    }
  });
  canvas.on('mouse:wheel', (event) => {
    if (!canvas.viewportTransform) return;
    const delta = event.e.deltaY;
    const viewportTransform = canvas.viewportTransform.slice();
    viewportTransform[5] -= delta / 2;
    canvas.setViewportTransform(viewportTransform);
    canvas.requestRenderAll();
    event.e.preventDefault();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
      canvas.remove(mouseIcon as fabric.Object);
      setMouseIcon(null);
    }
  });
};

export default SetCanvasEvents;
