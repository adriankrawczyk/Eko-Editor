import { fabric } from 'fabric';

const ReRenderObject = (width: number, height: number, object: fabric.Object): void => {
  const oldWidth = object.width || 0;
  const oldHeight = object.height || 0;
  const scaleX = width / oldWidth;
  const scaleY = height / oldHeight;

  // Scale the object
  object.scaleX *= scaleX;
  object.scaleY *= scaleY;

  // Position the object
  object.left *= scaleX;
  object.top *= scaleY;

  if (object instanceof fabric.Group) {
    object.forEachObject((childObject) => {
      // Scale and position each child object
      childObject.scaleX *= scaleX;
      childObject.scaleY *= scaleY;
      childObject.left *= scaleX;
      childObject.top *= scaleY;
    });
  }
};

export default ReRenderObject;
