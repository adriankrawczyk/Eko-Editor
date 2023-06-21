import { fabric } from 'fabric';

const SetObjectPrototype = () => {
  fabric.Object.prototype.set({ lockMovementY: true, lockMovementX: true, hasControls: false, hasBorders: false });
};
export default SetObjectPrototype;
