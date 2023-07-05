import { canvas } from './CanvasInstance';
import GetClosestObject from './GetClosestObject';

const StickRect = (mouseIcon: fabric.Object, pointer: { x: number; y: number }) => {
  const closestObject = GetClosestObject(pointer);
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
export default StickRect;
