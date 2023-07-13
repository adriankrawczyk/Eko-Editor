import { canvas } from './CanvasInstance';

const SetZoom = () => {
  canvas.on('mouse:wheel', (event) => {
    if (!event.e.ctrlKey) return;
    const pointer = canvas.getPointer(event.e);
    const delta = event.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    zoom = Math.max(0.5, Math.min(5, zoom));
    canvas.zoomToPoint(pointer, zoom);
    event.e.preventDefault();
  });
};
export default SetZoom;
