import { canvas } from '../../CanvasInstance';
import { fabric } from 'fabric';
import getAbsolutePosition from './GetAbsolutePositions';

const GetSelectedObject = (event: fabric.IEvent) => {
  const pointer: { x: number; y: number } = canvas.getPointer(event.e);
  const mouse: fabric.Point = new fabric.Point(pointer.x, pointer.y);
  const objects: fabric.Object[] = canvas.getObjects();
  const contentObjects: fabric.Object[] = [];

  function findContentObjects(obj: fabric.Object): void {
    if ('shape' in obj && obj['shape'] === 'content') {
      contentObjects.push(obj);
    }

    if (obj.type === 'group') {
      const groupObj = obj as fabric.Group;
      const groupObjects: fabric.Object[] = groupObj.getObjects();
      groupObjects.forEach((groupObj: fabric.Object) => {
        findContentObjects(groupObj);
      });
    }
  }

  objects.forEach((obj: fabric.Object) => {
    findContentObjects(obj);
  });

  let closestObject: fabric.Object | null = null;
  let minDistance = Infinity;

  contentObjects.forEach((obj: fabric.Object) => {
    let objLeft: number;
    let objTop: number;

    if (obj.group && (obj as fabric.Group)._objects.length === 2) {
      const absolutePosition = getAbsolutePosition(obj);
      objLeft = absolutePosition.left;
      objTop = absolutePosition.top;
    } else if ((obj as fabric.Group)._objects.length === 2) {
      objLeft = obj.left as number;
      objTop = obj.top as number;
    } else return;

    const distance = Math.sqrt(Math.pow(mouse.x - objLeft, 2) + Math.pow(mouse.y - objTop, 2));

    if (distance < minDistance) {
      minDistance = distance;
      closestObject = obj;
    }
  });

  if (closestObject) {
    canvas.setActiveObject(closestObject);
    return closestObject;
  }
};
export default GetSelectedObject;
