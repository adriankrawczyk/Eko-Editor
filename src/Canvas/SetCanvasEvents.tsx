import { canvas } from './CanvasInstance';
import { setMouseIcon, mouseIcon } from './MouseIcon';
import { fabric } from 'fabric';
import StickRect from './StickRect';
import StickText from './StickText';
import { ContextProps } from '../App';

const SetCanvasEvents = (context: ContextProps) => {
  canvas.on('mouse:move', (event) => {
    if (!mouseIcon || !mouseIcon.moving) return;
    mouseIcon.set({ opacity: 1 });

    const pointer = canvas.getPointer(event.e);
    mouseIcon.set({
      left: pointer.x,
      top: pointer.y,
    });
    if (mouseIcon.type === 'rect') StickRect(mouseIcon, pointer);
    else if (mouseIcon.type === 'text') StickText(mouseIcon, pointer);
    mouseIcon.setCoords();
    canvas.requestRenderAll();
  });

  canvas.on('selection:updated', (e) => {
    setMouseIcon(e.target as fabric.Object | null, context, false);
  });
  canvas.on('mouse:dblclick', (e) => {
    setMouseIcon(e.target as fabric.Object | null, context, true);
  });
  canvas.on('selection:cleared', () => {
    context.setRightbarContent(<></>);
  });
  canvas.on('object:scaling', (e) => {
    const target = e.target;
    if (!target) return;
    setMouseIcon(target, context, false);
    if (target.type !== 'rect') return;
    target.set({ strokeWidth: 0 });
  });
  canvas.on('mouse:up', () => {
    const target = canvas.getActiveObject();
    if (target && target.strokeWidth === 0 && target.type === 'rect') {
      const scaleX = target.scaleX as number;
      const scaleY = target.scaleY as number;
      const width = Math.round((target.width as number) * scaleX);
      const height = Math.round((target.height as number) * scaleY);
      target.set({
        width,
        height,
        scaleX: 1,
        scaleY: 1,
        strokeWidth: 1,
      });
      setMouseIcon(target, context, false);
    }
  });

  canvas.on('mouse:down', (e) => {
    if (mouseIcon) {
      mouseIcon.setCoords();
      setMouseIcon(null, context, false);
    } else {
      const target = e.target as fabric.Object;
      setMouseIcon(target, context, false);
      if (!mouseIcon) context.setRightbarContent(<></>);
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
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return;
      canvas.remove(activeObject);
      setMouseIcon(null, context, false);
    }
  });
};

export default SetCanvasEvents;
