import { fabric } from 'fabric';

const SetObjectPrototype = () => {
  fabric.Object.prototype.set({
    originX: 'center',
    originY: 'center',
    strokeDashArray: [10, 5],
    transparentCorners: false,
  });
  fabric.Object.prototype.cornerStyle = 'circle';
  fabric.Object.prototype.setControlsVisibility({
    tl: true,
    mt: true,
    tr: true,
    ml: true,
    mr: true,
    bl: true,
    mb: true,
    br: true,
    mtr: false,
  });
  fabric.Object.prototype.cornerColor = '#ADD8E6 ';
};

export default SetObjectPrototype;
