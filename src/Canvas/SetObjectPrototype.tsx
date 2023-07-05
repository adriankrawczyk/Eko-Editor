import { fabric } from 'fabric';

const SetObjectPrototype = () => {
  fabric.Object.prototype.set({ originX: 'center', originY: 'center', strokeDashArray: [10, 5] });
};
export default SetObjectPrototype;
