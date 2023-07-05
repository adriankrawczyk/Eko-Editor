import { canvas } from './CanvasInstance';
import { mouseIcon } from './MouseIcon';

const GetClosestObject = (pointer: { x: number; y: number }) => {
  const objects = canvas.getObjects();
  let closestObject = null;
  let closestDistance = Infinity;

  for (const object of objects) {
    const objectCenterX = object.left as number;
    const objectCenterY = object.top as number;

    const distance = Math.sqrt(Math.pow(pointer.x - objectCenterX, 2) + Math.pow(pointer.y - objectCenterY, 2));

    if (distance < closestDistance && object !== mouseIcon && object.type === 'rect') {
      closestObject = object;
      closestDistance = distance;
    }
  }
  return closestObject;
};
export default GetClosestObject;
