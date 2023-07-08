import { canvas } from './CanvasInstance';
import GetClosestObject from './GetClosestObject';

const StickText = (mouseIcon: fabric.Object, pointer: { x: number; y: number }) => {
  const closestObject = GetClosestObject(pointer);
  if (!closestObject) {
    canvas.requestRenderAll();
    return;
  }
  const stickDistance = 20;
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

  const distanceCenter = Math.sqrt(Math.pow(pointer.x - objectLeft, 2) + Math.pow(pointer.y - objectTop, 2));
  const distanceRight = Math.abs(pointer.x - rightPoint + mouseIconWidth / 2);
  const distanceLeft = Math.abs(pointer.x - leftPoint - mouseIconWidth / 2);
  const distanceTop = Math.abs(pointer.y - topPoint - mouseIconHeight / 2);
  const distanceBottom = Math.abs(pointer.y - bottomPoint + mouseIconHeight / 2);

  if (distanceRight < stickDistance && pointer.y < bottomPoint && pointer.y > topPoint) mouseIcon.set({ left: rightPoint - mouseIconWidth / 2 });
  if (distanceLeft < stickDistance && pointer.y < bottomPoint && pointer.y > topPoint) mouseIcon.set({ left: leftPoint + mouseIconWidth / 2 });

  if (distanceTop < stickDistance && pointer.x < rightPoint && pointer.x > leftPoint) mouseIcon.set({ top: topPoint + mouseIconHeight / 2 });
  if (distanceBottom < stickDistance && pointer.x < rightPoint && pointer.x > leftPoint) mouseIcon.set({ top: bottomPoint - mouseIconHeight / 2 });
  if (distanceCenter <= stickDistance) mouseIcon.set({ top: objectTop, left: objectLeft });
};
export default StickText;
